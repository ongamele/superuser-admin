import { gql } from "@apollo/client";

export const CREATE_APPLICATION = gql`
  mutation createApplication(
    $userId: String!
    $email: String!
    $name: String!
    $surname: String!
    $phoneNumber: String!
    $address: String!
    $postalCode: String
    $country: String!
    $municipalAcc: String
    $race: String!
    $houseHoldHead: Boolean
    $maritalStatus: String
    $dependents: Boolean
    $bankStatement: String
    $idBook: String
    $affidavid: String
    $gender: String!
    $companyName: String
    $companyPhoneNumber: String
    $companyEmail: String
    $occupation: String
    $income: Int
    $sourceOfIncome: String
  ) {
    createApplication(
      applicationInput: {
        userId: $userId
        name: $name
        surname: $surname
        email: $email
        phoneNumber: $phoneNumber
        address: $address
        postalCode: $postalCode
        country: $country
        municipalAcc: $municipalAcc
        race: $race
        houseHoldHead: $houseHoldHead
        maritalStatus: $maritalStatus
        dependents: $dependents
        bankStatement: $bankStatement
        idBook: $idBook
        affidavid: $affidavid
        gender: $gender
        companyName: $companyName
        companyPhoneNumber: $companyPhoneNumber
        companyEmail: $companyEmail
        occupation: $occupation
        income: $income
        sourceOfIncome: $sourceOfIncome
      }
    ) {
      userId
      name
      surname
      phoneNumber
      address
      postalCode
      country
      municipalAcc
      race
      houseHoldHead
      maritalStatus
      dependents
      bankStatement
      idBook
      affidavid
    }
  }
`;



export const CREATE_STATEMENTS = gql`
  mutation createStatement(
    $accountNumber: String!
    $date: String!
    $openingBalances: OpeningBalanceInput
    $cashPayments: CashPaymentInput
    $refuses: RefuseInput
    $sewerages: SewerageInput
    $waterTariffDomestics: WaterTariffDomesticInput
    $waterTariffDomesticBasics: WaterTariffDomesticBasicInput
    $charges: ChargeInput
    $vats: VATInput
    $interests: InterestInput
  ) {
    createStatement(
      statementInput: {
        accountNumber: $accountNumber
        date: $date
        openingBalances: $openingBalances
        cashPayments: $cashPayments
        refuses: $refuses
        sewerages: $sewerages
        waterTariffDomestics: $waterTariffDomestics
        waterTariffDomesticBasics: $waterTariffDomesticBasics
        charges: $charges
        vats: $vats
        interests: $interests
      }
    ) {
      id
      accountNumber
      date
      openingBalances {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      cashPayments {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      refuses {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      sewerages {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      waterTariffDomestics {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      waterTariffDomesticBasics {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      charges {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      vats {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      interests {
        id
        date
        code
        description
        units
        tariff
        value
        createdAt
      }
      createdAt
    }
  }
`;

// Input types for each nested field
export const OPENING_BALANCE_INPUT = gql`
  input OpeningBalanceInput {
    date: String!
    code: String!
    description: String!
    units: String!
    tariff: String!
    value: String!
  }
`;

export const CASH_PAYMENT_INPUT = gql`
  input CashPaymentInput {
    date: String!
    code: String!
    description: String!
    units: String!
    tariff: String!
    value: String!
  }
`;

// Repeat for other nested types...


export const CREATE_METER_READINGS = gql`
mutation createMeterReadings(
  $accountNumber: String
  $meterNumber: String
  $type: String
  $oldRead: String
  $newRead: String
  $consumption: String
  $leviedAmount: String
) {
  createMeterReadings(
    meterReadingsInput: {
      accountNumber: $accountNumber
      meterNumber: $meterNumber
      type: $type
      oldRead: $oldRead
      newRead: $newRead
      consumption: $consumption
      leviedAmount: $leviedAmount
    }
  ) 
}

`;


export const LOGIN_SUPERUSER = gql`
  mutation loginSuperuser($email: String!, $password: String!) {
    loginSuperuser(email: $email, password: $password)
  }
`;



//////Statement Details//////
export const CREATE_STATEMENT_DETAILS = gql`
  mutation createStatementDetails(
    $accountNumber: String!
    $date: String
    $consumerName: String
    $phoneNumber: String
    $email: String
    $idNumber: String
    $isIndigent: String
    $indigentExpiry: String
    $indigentApplicationDate: String
    $lastPaymentDate: String,
    $lastPaymentAmount: String,
    $accountStatus: String
    $province: String
    $town: String
    $suburb: String
    $ward: String!
    $street: String
    $postalAddress1: String
    $postalAddress2: String
    $postalAddress3: String
    $postalCode: String
    $vatNumber: String
    $marketValue: String
    $erfNumber: String
    $deposit: String
    $taxNumber: String
    $days120: String
    $days90: String
    $days60: String
    $days30: String
    $current: String
    $closingBalance: String
    $openingBalance: String
  ) {
    createStatementDetails(
      input: {
        accountNumber: $accountNumber
        date: $date
        consumerName: $consumerName
        phoneNumber: $phoneNumber
        email: $email
        idNumber: $idNumber
        isIndigent: $isIndigent
        indigentExpiry: $indigentExpiry
        indigentApplicationDate: $indigentApplicationDate
        lastPaymentDate: $lastPaymentDate
        lastPaymentAmount: $lastPaymentAmount
        accountStatus: $accountStatus
        province: $province
        town: $town
        suburb: $suburb
        ward: $ward
        street: $street
        postalAddress1: $postalAddress1
        postalAddress2: $postalAddress2
        postalAddress3: $postalAddress3
        postalCode: $postalCode
        vatNumber: $vatNumber
        marketValue: $marketValue
        erfNumber: $erfNumber
        deposit: $deposit
        taxNumber: $taxNumber
        days120: $days120
        days90: $days90
        days60: $days60
        days30: $days30
        current: $current
        closingBalance: $closingBalance
        openingBalance: $openingBalance
      }
    ) 
  }
`;


//////Cash Payment///////
export const ADD_BALANCE_REPORT = gql`
  mutation addBalanceReport(
    $accountNumber: String!
    $marketValue: String!
    $erfNumber: String!
    $vatNumber: String!
    $closingBalance: String!
  ) {
    addBalanceReport(
      input: {
        accountNumber: $accountNumber
        marketValue: $marketValue
        erfNumber: $erfNumber
        vatNumber: $vatNumber
        closingBalance: $closingBalance
      }
    ) 
  }
`;


//////Cash Payment///////
export const CREATE_CASH_PAYMENT = gql`
  mutation createCashPayment(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createCashPayment(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;



//////   Interest ///////
export const CREATE_INTEREST = gql`
  mutation createInterest(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createInterest(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;

//////Opening Statement///////
export const CREATE_OPENING_STATEMENT = gql`
  mutation createOpeningStatement(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createOpeningStatement(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;


//////   Refuse ///////
export const CREATE_REFUSE = gql`
  mutation createRefuse(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createRefuse(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;


//////Sewerage///////
export const CREATE_SEWERAGE = gql`
  mutation createSewerage(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createSewerage(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;


//////VAT///////
export const CREATE_VAT = gql`
  mutation createVat(
    $accountNumber: String!
    $date: String!
    $code: String!
    $description: String!
    $units: String!
    $tariff: String!
    $value: String!
  ) {
    createVat(
      input: {
        accountNumber: $accountNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;




//////Water Domestic///////
export const CREATE_WATER_TARIFF_DOMESTIC = gql`
  mutation createWaterTariffDomestic(
    $accountNumber: String
    $meterNumber: String
    $date: String
    $code: String
    $description: String
    $units: String
    $tariff: String
    $value: String
  ) {
    createWaterTariffDomestic(
      input: {
        accountNumber: $accountNumber
        meterNumber: $meterNumber
        date: $date
        code: $code
        description: $description
        units: $units
        tariff: $tariff
        value: $value
      }
    ) 
  }
`;




export const CREATE_NOTIFICATIONS = gql`
  mutation {
    createNotifications
  }
`;


export const CREATE_USER_NOTIFICATIONS = gql`
  mutation createUserNotification($accountNumber: String!) {
    createUserNotification(accountNumber: $accountNumber)
  }
`;

export const CREATE_USER_SMS_NOTIFICATIONS = gql`
  mutation createUserSmsNotification($accountNumber: String!) {
    createUserSmsNotification(accountNumber: $accountNumber)
  }
`;

export const CREATE_USER_EMAIL_NOTIFICATIONS = gql`
  mutation createUserEmailNotification($accountNumber: String!) {
    createUserEmailNotification(accountNumber: $accountNumber)
  }
`;


export const UPDATE_USER_DETAILS = gql`
  mutation updateUserDetails($accountNumber: String, $firstName: String, $lastName: String,$phoneNumber: String!, $email: String!) {
    updateUserDetails(accountNumber: $accountNumber, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, email: $email)
  }
`;