const express = require("express");
const router = express.Router();
var URL = require('url');
const request = require("request");
const cheerio = require("cheerio");
const config = require("config");
fs = require('fs');

//const url = 'ebay.com/itm/Air-Jordan-12-Reverse-Flu-Game-Retro-Varsity-Red-Black-CT8013-602-Size-5Y-6-5-W/224309627613?_trkparms=aid%3D1110006%26algo%3DHOMESPLICE.SIM%26ao%3D1%26asc%3D20201210111314%26meid%3D0382f357e2324253a37255b6b13df45a%26pid%3D101195%26rk%3D3%26rkt%3D12%26mehot%3Dpf%26sd%3D254756835649%26itm%3D224309627613%26pmt%3D1%26noa%3D0%26pg%3D2047675%26algv%3DSimplAMLv5PairwiseWebWithDarwoV3BBEV2b%26brand%3DNike&_trksid=p2047675.c101195.m1851';

// @route       GET api/scrapper
// @desc        scrap item prices from url's
// @access      public
// @endpoint    http://localhost:5000/api/scrapper

router.get('/',(req,res)=>{
    
        //Using request to strip out the html document from the url
        //the the function could be woring of an array of urls from the request body or getting them from a Data base server
        urls =['ebay.com/itm/Air-Jordan-12-Reverse-Flu-Game-Retro-Varsity-Red-Black-CT8013-602-Size-5Y-6-5-W/224309627613?_trkparms=aid%3D1110006%26algo%3DHOMESPLICE.SIM%26ao%3D1%26asc%3D20201210111314%26meid%3D0382f357e2324253a37255b6b13df45a%26pid%3D101195%26rk%3D3%26rkt%3D12%26mehot%3Dpf%26sd%3D254756835649%26itm%3D224309627613%26pmt%3D1%26noa%3D0%26pg%3D2047675%26algv%3DSimplAMLv5PairwiseWebWithDarwoV3BBEV2b%26brand%3DNike&_trksid=p2047675.c101195.m1851']
        urls.forEach(element => {
            request(element,async(error,
                response,html)=>{
                try {
                      //If there are any errors we may proceed
                if(!error && response.statusCode == 200) {
                    const  q = URL.parse(url, true);
                    const $ = cheerio.load(html);
                    if(q.host == config.get('amazonDomain')){
                        const product = $(`#${config.get('amazonProduct')}`).text();
                        const price = $(`.${config.get('amazon')}`).text();
                        console.log('this is product: ',product);
                        const newProduct = {
                            product:product,
                            price:price
                        }
                        fs.writeFile('products.json',JSON.stringify(newProduct), function (err) {
                            if (err) return console.log(err);
                          });
                    }
                    else if (q.host == config.get('ebayDomain')){
                        const product = $(`#${config.get('ebayProduct')}`).text().replace("Details about  ", '');;
                        const price = $(`#${config.get('ebay')}`).text();
                        const newProduct = {
                            product:product,
                            price:price
                        }
                        fs.writeFile('products.json',JSON.stringify(newProduct), function (err) {
                            if (err) return console.log(err);
                          });
                    }
                }
                } catch (error) {
                    console.log(error);
                }
                });
        });
          res.send('sucess');
})


module.exports = router;