let http = require("http")
let fs = require("fs");
let qs = require("qs");
let server= http.createServer((req, res) => {
    if (req.method == "GET") {
        fs.readFile("./calculator.html", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data)
                return res.end()
            }
        })
    } else {
        let data = ""
        req.on("data", chunk => {
            data += chunk
        })
        req.on("end", () => {
            let result = qs.parse(data)
            console.log(result);
            fs.readFile("./calculator.html","utf8" ,(err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    let finalresult = eval(`${result.a}${result.calculation}${result.b}`)
                    console.log(finalresult);
                    data = data.replace("Result:", `Result: ${finalresult}`)
                    res.writeHead(200, {"Content-Type": "text/html"})
                    res.write(data)
                    return res.end()
                }
            })
        })
        res.on("error", (err) => {
            console.log(err);
        })
    }
})
server.listen(8080, () => console.log("Server run on port 8080"))