
import pandas as pd
from os.path import exists


class Data():

    def __init__(self):
        self.df = pd.DataFrame()
        self.col_names_map = {"billno":"BillNO",
                    "4digit":"4Digit",
                    "date":"Date",
                    "hscode":"HSCode",
                    "product":"Product",
                    "quantity":"Quantity",
                    "unit":"Unit",
                    "item_rate_inv":"Item_Rate_INV",
                    "currency":"Currency",
                    "total_amount_inv_fc":"Total_Amount_INV_FC",
                    "fob inr":"FOB INR",
                    "foreignport":"ForeignPort",
                    "foreigncountry":"ForeignCountry",
                    "indianport":"IndianPort",
                    "iec":"IEC",
                    "indiancompany":"IndianCompany",
                    "address1":"Address1",
                    "address2":"Address2",
                    "city":"City",
                    "foreigncompany":"ForeignCompany",
                    "invoice_no":"Invoice_No",
                    "cush":"CUSH",
                    "iec_pin":"IEC_PIN",
                    "item_no":"Item_No",
                    "item_rate_inr":"Item_Rate_INR"}

    def data_handling(self):

        if exists("IMEX-IN-2016-06-EX.part2_pickle"):
            print("pickle already exists, loading dataframe from pickle")
            self.df = pd.read_pickle("IMEX-IN-2016-06-EX.part2_pickle")
            print("------------------")
            print(self.df.head())
            print("------------------")
        else:

            print("loading dataframe from xlsx file")
            self.df = pd.read_excel('IMEX-IN-2016-06-EX.part2.xlsx', sheet_name = 'Sheet1')

            print("------------------")
            print(self.df.head())
            print("------------------")

            self.df.to_pickle("IMEX-IN-2016-06-EX.part2_pickle")
            print("pickle created")
        
        self.df = self.df.fillna("")

    def search(self, column, text, pagination):
        # print("-------SEARCHDATA start-----------")
        # print(self.df.head())
        # print("-------SEARCHDATA end-------------")

        text = text.lower()
        
        if column in self.col_names_map:
            column = self.col_names_map[column]
        else:
            return "{}"
        t = self.df[self.df[column].str.lower().str.contains(text, regex=False)]
        start_rec =  int(pagination) * 5
        end_rec = min(start_rec + 5, len(t))

        print("pagination from record" + str(start_rec) + " to record " + str(end_rec))
        jt = t[start_rec:end_rec].to_json(orient = "index")
        return jt