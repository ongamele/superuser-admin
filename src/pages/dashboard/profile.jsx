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
    update(_, result) {
      if (result) {
        console.log("Water Readings Uploaded Successfully!")
      } else {
        //alert("Error while uploading water readings!");
      }
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

        //const keysArray = Object.keys(result.data[0]);
        //console.log(keysArray[6])
        
        for (let i = 0; i < result.data.length; i++) {

          let keysArray = Object.keys(result.data[i])

          let stringDate = result.data[i]?.LAST_PAYMENT_DATE
          let firstPortion = stringDate.substring(0, 4);
          let secondPortion = stringDate.substring(4, 6);
          let thirdPortion = stringDate.substring(6);

         
          let stringExpDate = result.data[i]?.INDIGENT_EXPIRY
          let firstExpPortion = stringExpDate.substring(0, 4);
          let secondExpPortion = stringExpDate.substring(4, 6);
          let thirdExpPortion = stringExpDate.substring(6);



          let formattedDate = `${firstPortion}-${secondPortion}-${thirdPortion}`;
          let formattedExpDate = `${firstExpPortion}-${secondExpPortion}-${thirdExpPortion}`;
            await createStatementDetails({
                variables: {
                  
                  accountNumber: result.data[i].ACCOUNT_NO,
                  date: keysArray[2].substring(0, 4) + '-' + keysArray[2].substring(4, 6),
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
                  days120: result.data[i][keysArray[6]],
                  days90: result.data[i][keysArray[5]],
                  days60: result.data[i][keysArray[4]],
                  days30: result.data[i][keysArray[3]],
                  current: result.data[i][keysArray[2]],
                  closingBalance: '',
                  openingBalance: ''
                },
              });

        
          
           /* if(result.data[i].SERVICE === 'PAYMENT'){
              createCashPayment({
                variables: {
                  accountNumber: result.data[i].ACCOUNT_NO,
                  date: result.data[i].LAST_PAYMENT_DATE,
                  code: '008888',
                  description: result.data[i].SERVICE,
                  units: result.data[i].ERF_UNIT_NUMBER,
                  tariff: '.000',
                  value: result.data[i].TOTAL
                },
              }); 
            }
          






            else if(result.data[i].SERVICE === 'INTEREST'){
            
              createInterest({
                variables: {
                  accountNumber: result.data[i].ACCOUNT_NO,
                  date: result.data[i].LAST_PAYMENT_DATE,
                  code: '009009',
                  description: result.data[i].SERVICE,
                  units: result.data[i].ERF_UNIT_NUMBER,
                  tariff: '',
                  value: result.data[i].TOTAL
                },
              }); 
            }



           else if(result.data[i].SERVICE === 'REFUSE'){
          
            createRefuse({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: '060010',
                description: result.data[i].SERVICE,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: '1.000',
                value: result.data[i].TOTAL
              },
            }); 
           }








           else if(result.data[i].SERVICE === 'SEWERAGE'){
          
            createSewerage({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: '050010',
                description: result.data[i].SERVICE,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: '1.000',
                value: result.data[i].TOTAL
              },
            }); 
           }





           else if(result.data[i].SERVICE === 'VAT'){
          
            createVat({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: '009008',
                description: result.data[i].SERVICE,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: '',
                value: result.data[i].TOTAL
              },
            }); 
           }


          

           if(result.data[i].SERVICE === 'WATER'){
          
            createWaterTariffDomestic({
              variables: {
                accountNumber: result.data[i].ACCOUNT_NO,
                date: result.data[i].LAST_PAYMENT_DATE,
                code: '041001',
                description: result.data[i].SERVICE,
                units: result.data[i].ERF_UNIT_NUMBER,
                tariff: '5.000',
                value: result.data[i].TOTAL
              },
            }); 
  
  
        
           }*/
  

        }
      } catch (error) {
        console.error('Error parsing or processing data:', error);
        // Handle the error as needed
      }


    })();
  }; 
  const handleBalanceReportFileChange = (event) => {
    let file = event.target.files[0];
    
    Papa.parse(file, {
      complete: (result) => {
      // console.log(JSON.stringify(result.data));
  
       
  
  // Iterate through the keys of the current object
  for (let i = 0; i < result.data.length; i++) {
    setTimeout(() => {
      addBalanceReport({
        variables: {
          accountNumber: result.data[i]['ACCOUNT NO'],
          marketValue: result.data[i].VALUATION,
          erfNumber: result.data[i]['ERF NUMBER'],
          vatNumber: result.data[i]['VAT REG NUMBER'],
          closingBalance: result.data[i]['OUTSTANDING TOTAL BALANCE']
        },
      });
    }, i * 50); // Adjust the delay (e.g., 1000ms = 1 second)
  }
        
        /*for(let i = 0; i < result.data.length; i++){
         
          addBalanceReport({
            variables: {
              accountNumber: result.data[i]['ACCOUNT NO'],
              email: result.data[i]['EMAIL ADDRESS'],
              phoneNumber: result.data[i]['CELL NUMBER'],
              marketValue: result.data[i].VALUATION,
              erfNumber: result.data[i]['ERF NUMBER'],
              vatNumber: result.data[i]['VAT REG NUMBER'],
              closingBalance: result.data[i]['OUTSTANDING TOTAL BALANCE']
            },
          });

        }*/
        //Send data to the database
       
      },
      header: true, // Set this option to true if your CSV file has a header row
    });
  };


  const handleMeterFileChange = (event) => {
    let file = event.target.files[0];
    
    Papa.parse(file, {
      complete: (result) => {
        console.log(JSON.stringify(result.data));
       //console.log(JSON.stringify(result.data));

       // Iterate through the keys of the current object

        
       /* for(let i = 0; i < result.data.length; i++){
         
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

        } */
        //Send data to the database
       
      },
      header: true, // Set this option to true if your CSV file has a header row
    });
  };


  const handleSubmitStatements = () =>{
   // sendSMS()
    createStatements();
  }

  const sendSMS = async () => {
    try {
      const apiKey =
        "2319f2b218dfee20edf691f73ccba12f-73d582c6-316c-4b53-a90c-1c0c1fa1c94f";
      const message = `Mohokare: Hello, Your statement for the month of December is available. You can access it here https://mohokarestatements.co.za/`;

      const response = await axios.post(
        "https://api.infobip.com/sms/1/text/single",
        {
          from: "27872406515",
          to: "27" + 849626748,
          text: message,
        },
        {
          headers: {
            Authorization: `App ${apiKey}`,
          },
        }
      );

      alert("Statements uploaded successfully!",);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };


  return (
    <section className="m-8 flex gap-4">
    <div className="w-full lg:w-3/5 mt-24">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">New Statements</Typography>
        <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Upload the CSV files to complete your submission.</Typography>
      </div>
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

    </div>
    <div className="w-2/5 h-full hidden lg:block">
     
    </div>

  </section>
  );
}

export default Profile;
