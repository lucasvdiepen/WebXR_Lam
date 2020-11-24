var pathToLanguages = "languages/languages.json";
var defaultLanguage = "languages/en.json";

var savedLanguage = "";

function SelectDefaultLanguage()
{
    localStorage.setItem("language", defaultLanguage);
    savedLanguage = defaultLanguage;
    SelectLanguage(savedLanguage);
}

function SelectLanguage(path)
{
    $.getJSON(path, function(json) {
        //change all text
        $("#welcomeText").text(json.greeting);
        })
        .fail(function(){
            SelectDefaultLanguage();
            console.log("Failed getting language data");
        })
}


function FillSelectWithOptions(savedLanguage)
{
    $.getJSON(pathToLanguages, function(json) {
        for(var i = 0; i < json.languages.length; i++)
        {
            //$("#languageSelect").append('<option value="' + json.languages[i].file + '">'+ json.languages[i].language + '</option>')
            $('#languageSelect').append($('<option>',
            {
                value: json.languages[i].file,
                text : json.languages[i].language,
                selected: json.languages[i].file == savedLanguage
            }));
        }
        
        })
        .fail(function(){
            console.log("Failed getting languages data");
        })
}

$(document).ready(function(){
    $("#languageSelect").on("change", function(){
        var selectedLanguage = $("#languageSelect option:selected").val();
        SelectLanguage(selectedLanguage);
        localStorage.setItem("language", selectedLanguage);
    });

    savedLanguage = localStorage.getItem("language");
    if(savedLanguage == null || savedLanguage == "")
    {
        //sets default language
        SelectDefaultLanguage();
    }
    else SelectLanguage(savedLanguage);

    FillSelectWithOptions(savedLanguage);
});