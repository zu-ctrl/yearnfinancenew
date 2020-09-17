const axios = require("axios");
const qs = require("qs");
const fs = require("fs");
const parser = require("xml2json");

const DL_APIKEY = "fa252f19-12f0-49c0-391f-0e5b2187bd62";
const APIVERSION = 2;

const outputLangs = ["DE", "FR", "IT", "JA", "ES", "NL", "PL", "PT", "RU", "ZH"];

const translationsPath = "./src/locales";
const js2xmlparser = require("js2xmlparser");

/**
 * Call DL api
 * @param {String} xml
 * @param {String} source language
 * @param {String} target language
 * @return {String} translated text
 */
const translateXml = (xml, source_lang, target_lang) => {
  const params = {
    source_lang,
    tag_handling: "xml",
    outline_detection: 0,
    target_lang,
    auth_key: DL_APIKEY,
    preserve_formatting: true,
    text: xml,
  };

  //build request params
  const url = `https://api.deepl.com/v${APIVERSION}/translate`;

  return axios.post(url, qs.stringify(params), {
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
};

/**
 * generate translation files
 * @return {Promise<void>}
 */
const translateFiles = async () => {
  let input = require(`${translationsPath}/en/translation.json`);
  input = { input };

  //for each output language - generate translation files
  outputLangs.forEach(async (lang) => {
    //generate XML to traslate at DL
    const input_xml = js2xmlparser.parse("root", input);

    const res = await translateXml(input_xml, "en", lang);
    const res_xml = res.data.translations[0].text;

    // convert xml back to json
    let data = parser.toJson(res_xml);
    data = JSON.parse(data).root.input;
    console.log("translated data", data);

    const outputFolder = `${translationsPath}/${lang.toLowerCase()}`;

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    fs.writeFileSync(`${outputFolder}/translation.json`, JSON.stringify(data, null, 2));
  });
};

translateFiles();
