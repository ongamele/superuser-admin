import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Papa from 'papaparse';
import { useMutation } from "@apollo/react-hooks";
import { CREATE_STATEMENT_DETAILS } from "../../Graphql/Mutations";
import { CREATE_CASH_PAYMENT } from "../../Graphql/Mutations";
import { CREATE_INTEREST } from "../../Graphql/Mutations";
import { CREATE_OPENING_STATEMENT } from "../../Graphql/Mutations";
import { CREATE_REFUSE } from "../../Graphql/Mutations";
import { CREATE_SEWERAGE } from "../../Graphql/Mutations";
import { CREATE_VAT} from "../../Graphql/Mutations";
import { CREATE_WATER_TARIFF_DOMESTIC } from "../../Graphql/Mutations";
import { ADD_BALANCE_REPORT } from "../../Graphql/Mutations";
import { CREATE_NOTIFICATIONS } from "../../Graphql/Mutations";


import { CREATE_METER_READINGS } from "../../Graphql/Mutations";

import { Link } from "react-router-dom";

export function Profile() {


  const[accountNumber, setAccountNumber] = useState("24566352")

/*########################################################### Account Details #####################################################*/


const [createStatementDetails, { loading: statementDetailsLoading }] = useMutation(CREATE_STATEMENT_DETAILS, {
  update(_, result) {
    if (result) {
      console.log("Statement Details Uploaded Successfully!")
    } else {
      console.log("Error while uploading statements!");
    }
  },
  onError(err) {
    console.log("Error! " + err);
  },
});

const [addBalanceReport, { loading: balanceReportLoading }] = useMutation(ADD_BALANCE_REPORT, {
  update(_, result) {
    if (result) {
      console.log("Balance Report Uploaded Successfully!")
    } else {
      console.log("Error while uploading balance report!");
    }
  },
  onError(err) {
    console.log("Error! " + err);
  },
});

  const [createCashPayment, { loading: cashPaymentLoading }] = useMutation(CREATE_CASH_PAYMENT, {
    update(_, result) {
      if (result.data.createCashPayment) {
        console.log("Cash Pyament Uploaded Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  const [createInterest, { loading: interestLoading }] = useMutation(CREATE_INTEREST, {
    update(_, result) {
      if (result.data.createInterest) {
        console.log("Interest Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });


  const [createRefuse, { loading: refuseLoading }] = useMutation(CREATE_REFUSE, {
    update(_, result) {
      if (result.data.createRefuse) {
        console.log("Refuse Uploaded Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });



  const [createSewerage, { loading: sewerageLoading }] = useMutation(CREATE_SEWERAGE, {
    update(_, result) {
      if (result.data.createSewerage) {
        console.log("Sewerage Uploaded Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

  const [createVat, { loading: vatLoading }] = useMutation(CREATE_VAT, {
    update(_, result) {
      if (result.data.createVat) {
        console.log("Vat Uploaded Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });


  
  const [createWaterTariffDomestic, { loading: waterTariffDomesticLoading }] = useMutation(CREATE_WATER_TARIFF_DOMESTIC, {
    update(_, result) {
      if (result.data.createWaterTariffDomestic) {
        console.log("Water Domestic Uploaded Successfully!")
      } else {
        console.log("Error while uploading statements!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });



  const [createNotifications, { loading: createNotificationsLoading }] = useMutation(CREATE_NOTIFICATIONS, {
    update(_, result) {
      if (result.data.createNotificaitons) {
        alert("Notifications Sent Successfully!")
      } else {
        console.log("Error while ceating notifications!");
      }
    },
    onError(err) {
      console.log("Error! " + err);
    },
  });

    


  /*########################################################### End Account Details #####################################################*/



  /*########################################################### Meter Readings #####################################################*/
  const [createMeterReadings, { loading: loadingNeterReadings }] = useMutation(CREATE_METER_READINGS, {
    onCompleted(data) {
        console.log("Water Readings Uploaded Successfully!")
      
    },
    onError(err) {
      console.log("Error! " + err);
    },

  });
  /*########################################################### End Meter Readings #####################################################*/


  const handleFileChange = (event) => {
    let file = event.target.files[0];
  
    (async () => {
      try {
        const result = await new Promise((resolve, reject) => {
          Papa.parse(file, {
            complete: (result) => {
              resolve(result);
            },
            header: true,
          });
        });
  
        let d30 = 0;
        let d60 = 0;
        let d90 = 0;
        let d120 = 0;
        let dCurrent = 0;
  
        for (let i = 0; i < result.data.length; i++) {
          // Check and remove leading zero from ACCOUNT_NO
    
  
          for (const key in result.data[i]) {
            if (key.includes("(30 Days)")) {
              d30 += parseFloat(result.data[i][key]);
            }
          }
          for (const key in result.data[i]) {
            if (key.includes("(60 Days)")) {
              d60 += parseFloat(result.data[i][key]);
            }
          }
          for (const key in result.data[i]) {
            if (key.includes("(90 Days)")) {
              d90 += parseFloat(result.data[i][key]);
            }
          }
          for (const key in result.data[i]) {
            if (key.includes("(120 Days)")) {
              d120 += parseFloat(result.data[i][key]);
            }
          }
          for (const key in result.data[i]) {
            if (key.includes("(Current)")) {
              dCurrent += parseFloat(result.data[i][key]);
            }
          }
  
          let keysArray = Object.keys(result.data[i]);
  
          let stringDate = result.data[i]?.LAST_PAYMENT_DATE;
          let firstPortion = stringDate.substring(0, 4);
          let secondPortion = stringDate.substring(4, 6);
          let thirdPortion = stringDate.substring(6);
  
          let stringExpDate = result.data[i]?.INDIGENT_EXPIRY;
          let firstExpPortion = stringExpDate.substring(0, 4);
          let secondExpPortion = stringExpDate.substring(4, 6);
          let thirdExpPortion = stringExpDate.substring(6);
          let formattedDate = `${firstPortion}-${secondPortion}-${thirdPortion}`;
          let formattedExpDate = `${firstExpPortion}-${secondExpPortion}-${thirdExpPortion}`;
  
          await createStatementDetails({
            variables: {
              accountNumber: result.data[i].ACCOUNT_NO,
              date: keysArray[11].substring(0, 4) + '-' + keysArray[11].substring(4, 6),
              consumerName: result.data[i].ACCOUNT_HOLDER,
              phoneNumber: result.data[i].CELL_NUMBER.substring(1),
              email: result.data[i].ACCOUNT_EMAIL,
              idNumber: result.data[i].ID_NUMBER_1.substring(1),
              isIndigent: result.data[i].INDIGENT_YN === 'N' ? 'No' : 'Yes',
              indigentExpiry: formattedExpDate,
              indigentApplicationDate: result.data[i].INDIGENT_APPLICATION.slice(0, 4) + '-' + result.data[i].INDIGENT_APPLICATION.slice(4, 6) + '-' + result.data[i].INDIGENT_APPLICATION.slice(6),
              lastPaymentDate: formattedDate,
              lastPaymentAmount: result.data[i].LAST_PAYMENT_AMT,
              accountStatus: result.data[i].ACCOUNT_STATUS,
              province: result.data[i].PROVINCE,
              town: result.data[i].TOWN,
              suburb: result.data[i].SUBURB,
              ward: result.data[i].WARD,
              street: result.data[i].STREET_ADDRESS,
              postalAddress1: result.data[i].POST_ADR_1,
              postalAddress2: result.data[i].POST_ADR_2,
              postalAddress3: result.data[i].POST_ADR_3,
              postalCode: result.data[i].POST_CODE,
              vatNumber: '',
              marketValue: '',
              erfNumber: '',
              deposit: result.data[i].DEPOSIT,
              taxNumber: '',
              days120: d120,
              days90: d90,
              days60: d60,
              days30: d30,
              current: dCurrent,
              closingBalance: '',
              openingBalance: ''
            },
          });
  
          d30 = 0;
          d60 = 0;
          d90 = 0;
          d120 = 0;
          dCurrent = 0;
  
          if (result.data[i].SERVICE_DESC === 'PAYMENT') {
            let paymentDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                paymentDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createCashPayment({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: paymentDCurrent.toString(),
                value: paymentDCurrent.toString()
              },
            });
          } else if (result.data[i].TARIFF_CODE === '009009') {
            let interestDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                interestDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createInterest({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: interestDCurrent.toString(),
                value: interestDCurrent.toString()
              },
            });
          } else if (result.data[i].TARIFF_CODE == "060010") {
            let refuseDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                refuseDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createRefuse({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: refuseDCurrent.toString(),
                value: refuseDCurrent.toString()
              },
            });
          } else if (result.data[i].TARIFF_CODE == "050010") {
            let sewerageDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                sewerageDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createSewerage({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: sewerageDCurrent.toString(),
                value: sewerageDCurrent.toString()
              },
            });
          } else if (result.data[i].TARIFF_CODE === '009008') {
            let vatDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                vatDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createVat({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: vatDCurrent.toString(),
                value: vatDCurrent.toString()
              },
            });
          } else if (result.data[i].TARIFF_CODE === '041001') {
            let waterDCurrent = 0;
            for (const key in result.data[i]) {
              if (key.includes("(Current)")) {
                waterDCurrent = parseFloat(result.data[i][key]);
              }
            }
            createWaterTariffDomestic({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: result.data[i].TARIFF_CODE,
                description: result.data[i].SERVICE_DESC,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: waterDCurrent.toString(),
                value: waterDCurrent.toString()
              },
            });
          }
        }
      } catch (error) {
        console.error('Error parsing or processing data:', error);
       
      }
    })();
  };
   
  const handleBalanceReportFileChange = (event) => {
    let file = event.target.files[0];
  
    Papa.parse(file, {
      complete: (result) => {
        // Iterate through the keys of the current object
        for (let i = 0; i < result.data.length; i++) {
     
  
          setTimeout(() => {
            addBalanceReport({
              variables: {
                accountNumber: result.data[i]['ACCOUNT NO'],
                email: result.data[i]['EMAIL ADDRESS'],
                phoneNumber: result.data[i]['CELL NUMBER'],
                marketValue: result.data[i].VALUATION,
                erfNumber: result.data[i]['ERF NUMBER'],
                vatNumber: result.data[i]['VAT REG NUMBER'],
                closingBalance: result.data[i]['OUTSTANDING TOTAL BALANCE'],
              },
            });
          }, i * 50); // Adjust the delay (e.g., 1000ms = 1 second)
        }
      },
      header: true, // Set this option to true if your CSV file has a header row
    });
  };
  


  const handleMeterFileChange = (event) => {
    let file = event.target.files[0];
    
    Papa.parse(file, {
      complete: (result) => {
        for (let i = 0; i < result.data.length; i++) {
          // Check and remove leading zero from AccountNo
          if (accountNumber.length === 9) {
            accountNumber = '0' + accountNumber;
          }
          createMeterReadings({
            variables: {
              accountNumber: result.data[i].AccountNo,
              meterNumber: result.data[i].MeterNumber,
              type: result.data[i].MeterType,
              oldRead: result.data[i].PrevRead,
              newRead: result.data[i].CurrRead,
              consumption: result.data[i].Consumption,
              leviedAmount: result.data[i].TotLevied
            },
          });
        }
      },
      header: true, 
    });
  };
  


  const handleSubmitStatements = () =>{
   // sendSMS()
    createStatements();
  }



  return (
    <section className="m-8 flex gap-4">
    <div className="w-full lg:w-3/5 mt-24">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">New Statements</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Upload the CSV files to complete your submission.</Typography>
      </div>
      {statementDetailsLoading || balanceReportLoading || loadingNeterReadings ? (<h1>Uploading data this can take a few minutes...</h1>) : (
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
        <div className="mb-1 flex flex-col gap-6">
  
        
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Det Age
          </Typography>
          <Input
            size="lg"
            type="file"
            placeholder="Mills"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleFileChange}
          />
             
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Balance Report
          </Typography>
          <Input
            size="lg"
            type="file"
            placeholder="Mills"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleBalanceReportFileChange}
          />

             
          <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
            Meter Readings
          </Typography>
          <Input
            size="lg"
            type="file"
            placeholder="Mills"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={handleMeterFileChange}
          />
          
        </div>
        
        
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center justify-start font-medium"
            >
              I agree the&nbsp;
              <a
                href="#"
                className="font-normal text-black transition-colors hover:text-gray-900 underline"
              >
                Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button onClick={() => createNotifications()} className="mt-6" fullWidth style={{backgroundColor: "#3855E5"}}>
          Send Bulk Email & SMS
        </Button>

    
      </form>
      )}

    </div>
    <div className="w-2/5 h-full hidden lg:block">
     
    </div>

  </section>
  );
}

export default Profile;
