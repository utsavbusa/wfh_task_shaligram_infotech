import puppeteer, { Browser } from 'puppeteer';

let browser: Browser | null = null;

async function getBrowserInstance(): Promise<Browser> {
    if (!browser) {
        browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            headless: true,
        });
    }
    return browser;
}

export async function generatePdf(htmlContent: string): Promise<Buffer> {
    let page = null;
    try {
        const browser = await getBrowserInstance();
        page = await browser.newPage();

        // Block unnecessary resources to speed up the page load
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            const resourceType = request.resourceType();
            if (resourceType === 'image' || resourceType === 'stylesheet' || resourceType === 'font' || resourceType === 'script') {
                request.abort();
            } else {
                request.continue();
            }
        });

        // Set the HTML content
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Generate a PDF from the content
        const pdfBuffer = await page.pdf({ format: 'A4' });

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    } finally {
        if (page) {
            await page.close();
        }
    }
}

process.on('exit', async () => {
    if (browser) {
        await browser.close();
    }
});
