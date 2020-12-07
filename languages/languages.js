var pathToLanguages = "languages/languages.json";
var defaultLanguage = "languages/en.json";

var savedLanguage = "";

let allLanguageFiles = {}
let allLanguageImages = {}

function SelectDefaultLanguage()
{
    localStorage.setItem("language", defaultLanguage);
    savedLanguage = defaultLanguage;
    //SelectLanguage(savedLanguage);
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function SelectLanguage(path, click)
{
    if(path != savedLanguage || !click)
    {
        let langName = getKeyByValue(allLanguageFiles, path);
        if(langName)
        {
            $(".currentLanguage p").text(langName);
            $(".currentLanguage img").attr("src", allLanguageImages[langName]);
            $("#language" + getKeyByValue(allLanguageFiles, savedLanguage) + " p").removeClass("selectedLanguageDropdown");
            $("#language" + langName + " p").addClass("selectedLanguageDropdown");
        } 
        
        localStorage.setItem("language", path);
        savedLanguage = path;
        $.getJSON(path, function(json) {
            //change all text
            $("#welcomeText").text(json.greeting);
            $(".webXRbutton").text(json.xrButton);
        })
        .fail(function(){
            SelectDefaultLanguage();//PROBLEM: infinite loop if file does not exitst or is unavailable
            console.log("Failed getting language data");
        })
    }
}

function LanguageClick(lang)
{
    SelectLanguage(allLanguageFiles[lang], true);
}

function FillSelectWithOptions(savedLanguage)
{
    //var json = JSON.parse('{"languages":[{"language":"English","image":"languages/images/en.png","file":"languages/en.json"},{"language":"Nederlands","image":"languages/images/nl.png","file":"languages/nl.json"}]}');
    $.getJSON(pathToLanguages, function(json) {
        for(var i = 0; i < json.languages.length; i++)
        {
            let pClass = "";
            //stores all files and image locations by language name
            allLanguageFiles[json.languages[i].language] = json.languages[i].file;
            allLanguageImages[json.languages[i].language] = json.languages[i].image;

            if(json.languages[i].file == savedLanguage){
                $(".currentLanguage img").attr("src", json.languages[i].image);
                $(".currentLanguage p").text(json.languages[i].language);
                pClass = "selectedLanguageDropdown";
            }

            $("<div>/",{
                id: "language" + json.languages[i].language,
                onclick: "LanguageClick('" + json.languages[i].language + "');"
            }).appendTo(".languageDropdownContent").append('<img class="languageFlag" src="' + json.languages[i].image + '"><p class="' + pClass + '">' + json.languages[i].language + '</p>');
        }
    })
    .fail(function(){
        console.log("Failed getting languages data");
    })
}

$(document).ready(function(){
    

    savedLanguage = localStorage.getItem("language");
    if(savedLanguage == null || savedLanguage == "")
    {
        //sets default language
        SelectDefaultLanguage();
    }

    FillSelectWithOptions(savedLanguage);
    SelectLanguage(savedLanguage, false);
});