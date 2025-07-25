const puppeteer = require('puppeteer');

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {
            order_id,
            payment_id,
            contact,
            email,
            vehicleName,
            amount,
            checkindate,
            checkoutdate,
            name,
            isadvance,
            noOfTravellers,
            invoiceDate,
            totalPrice,
            advancePaid,
            city,
            state,
            pickupLocation,
            noofdays,
            gst,
            cf,
            discount,
            appliedCoupon,
            basePrice,
            drivetype,
        } = req.body;

        if (order_id && payment_id) {
            const baseurl = process.env.BASEURL;

            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--font-render-hinting=none',
                ],
            });

            const page = await browser.newPage();
            const pages = await browser.pages();
            if (pages.length > 1) {
                await pages[0].close();
            }

            const url = `${baseurl}/vehicleinvoicetemplate?order_id=${order_id}&payment_id=${payment_id}&vehicleName=${encodeURIComponent(vehicleName)}&amount=${amount}&checkindate=${checkindate}&checkoutdate=${checkoutdate}&contact=${contact}&email=${email}&name=${encodeURIComponent(name)}&isadvance=${isadvance}&noOfTravellers=${noOfTravellers}&invoiceDate=${invoiceDate}&totalPrice=${totalPrice}&advancePaid=${advancePaid || 0}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&pickupLocation=${encodeURIComponent(pickupLocation)}&noofdays=${noofdays}&gst=${gst}&cf=${cf}&discount=${discount}&appliedCoupon=${appliedCoupon || null}&basePrice=${basePrice}&drivetype=${drivetype}`;

            console.log("Generating invoice from:", url);

            await page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 60000,
            });

            await page.setDefaultNavigationTimeout(0);

            const pdf = await page.pdf({
                path: 'public/invoice.pdf',
                format: 'A4',
                scale: 0.67,
                margin: {
                    top: '20mm',
                    left: '3mm',
                    right: '3mm',
                    bottom: '10mm',
                },
            });

            await browser.close();

            if (pdf) {
                res.status(200).json('success');
            } else {
                res.status(400).json('PDF generation failed');
            }
        } else {
            res.status(400).json('Missing payment_id or order_id');
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
