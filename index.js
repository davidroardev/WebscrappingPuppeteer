import puppeteer from 'puppeteer';
import fs from 'fs';

//inicializar puppeteer

async function openPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');

    await browser.close();
}

//Tomar una captura de pantalla
async function capturePage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');

    await page.screenshot({path: 'Capturas de pantalla/emjemploCaptura.png'});

    await browser.close();
}

//capturePage()

//hacer click en un elemento de la pagina
async function clickOnPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 400,//cada una de las operaciones que realice el navegador se va a demorar 500 milisegundos

    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com/');

    await page.click('a[href="/login"]');

    await page.screenshot({path: 'Capturas de pantalla/capturaLogin.png'});

    await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos para ver el resultado de la accion anterior

    await browser.close();
}

//clickOnPage();

//obtener datos de una pagina web
async function getDataFromPage() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
    });
    const page = await browser.newPage();

    await page.goto('https://example.com');

    const result = await page.evaluate(() => {
        const title = document.querySelector('h1').innerText;
        const description = document.querySelector('p').innerText;
        const link = document.querySelector('a').href;
        return {
            Titulo: title,
            Parrafo: description,
            Enlace:link   
        };    
    })

    console.log(result); 

    await browser.close();
}

//getDataFromPage();

//Manejar informacion de una pagina web
async function handleInformationFromPages(){
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500,
    });
    const page = await browser.newPage();

    await page.goto('https://quotes.toscrape.com/');

    const result = await page.evaluate(() => {
        const quotes = document.querySelectorAll('.quote');
        const data = [...quotes].map((quote) => {   
            const quoteText = quote.querySelector('.text').innerText;
            const authorName = quote.querySelector('.author').innerText;
            const tags = [...quote.querySelectorAll('.tag')].map((tag)=> tag.innerText);
            return {
                quoteText,
                authorName,
                tags
            }
        });
        return data;
    });
    
    await browser.close();

    return result;
}


function saveDataToJson (resultado, filename = 'quotes2.json') {
    const dataToJson = JSON.stringify(resultado, null, 2);
    fs.writeFileSync(`quotes/${filename}`, dataToJson);
    console.log(`la data se guardo con el nombre ${filename}`);
}

async function main(){
    const file = await handleInformationFromPages();
    saveDataToJson(file);
}

main();