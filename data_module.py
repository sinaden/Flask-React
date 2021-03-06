
import pandas as pd
from os.path import exists
import json

class Data():

    def __init__(self):
        self.df = pd.DataFrame()
        self.no_column_error = "{'error':'column does not exit'}"
        self.empty_result = "{}"
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
        
        # Preprocessing data

        # Replacing null values
        self.df = self.df.fillna("")
        
        # Convert values to string
        self.df = self.df.astype(str)


    def get_all(self, pagination):
        a_df = self.df.copy()

        start_rec =  int(pagination) * 5
        end_rec = min(start_rec + 5, len(a_df))

        print("pagination from record" + str(start_rec) + " to record " + str(end_rec))
        jt = a_df[start_rec:end_rec].to_json(orient = "index")
        return jt

    def advanced_search(self,cols,terms, pagination):        
        a_df = self.df.copy()
        for k in cols:
            column = cols[k]
            text = terms[k]
            if column in self.col_names_map:
                column = self.col_names_map[column]
            else:
                return self.no_column_error
            a_df = a_df[a_df[column].str.lower().str.contains(text.lower(), regex=False)]

        if a_df.empty:
            return self.empty_result

        start_rec =  int(pagination) * 5
        end_rec = min(start_rec + 5, len(a_df))

        print("pagination from record" + str(start_rec) + " to record " + str(end_rec))
        jt = a_df[start_rec:end_rec].to_json(orient = "index")
        return jt

    def search(self, column, text, pagination):

        text = text.lower()
        
        if column in self.col_names_map:
            column = self.col_names_map[column]
        else:
            return self.no_column_error
        t = self.df[self.df[column].str.lower().str.contains(text, regex=False)]
        start_rec =  int(pagination) * 5
        end_rec = min(start_rec + 5, len(t))

        print("pagination from record" + str(start_rec) + " to record " + str(end_rec))
        jt = t[start_rec:end_rec].to_json(orient = "index")
        return jt