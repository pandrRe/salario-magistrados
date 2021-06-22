import { Reader } from "./reader";
import {  registerServices, services } from "./services"
import Papa from "papaparse";
import { Parser } from "./parser";
import { DOM } from "./dom";

registerServices({
    reader: Reader,
    parser: Parser,
    DOM,
});
const [readerService, parserService, DOMService] = services("reader", "parser", "DOM");

(async () => {
    const reader = await readerService.getCSVStreamReader("./data/contracheque.csv");
    let lines = 0;
    let keys = [];

    let total = 0;
    let aboveThousand = 0;

    const totalElement = DOMService.animatedNumber("#total-value", 0, 999.23, 10);
    const aboveThousandElement = DOMService.animatedNumber("#above-thousand", 0, 1, 50);

    for await (let line of readerService.readCSVStreamToLines(reader)) {
        const csv = Papa.parse(line);
        if (lines == 0) {
            keys = csv.data[0];
        }
        else {
            const record = parserService.transformDates(
                parserService.parseArrayToObject(keys, csv.data[0]),
                ['mesano_de_referencia']
            );
            
            if (record.mesano_de_referencia.getUTCMonth() == 0 && record.lotacao == "CONSELHO NACIONAL DE JUSTIÇA") {
                total += Number(record.rendimento_liquido);
                totalElement.feed(total);
                if (Number(record.diarias) > 1000) {
                    aboveThousand++;
                    aboveThousandElement.feed(aboveThousand);
                }
            }
        }
        lines += 1;
    }
})();