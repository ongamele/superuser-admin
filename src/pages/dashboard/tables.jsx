import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Input,
} from "@material-tailwind/react";
import { useQuery } from "@apollo/react-hooks";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { GET_ALL_STATEMENTS } from "../../Graphql/Queries";

export function Tables() {

  const { data: allStatements } = useQuery(GET_ALL_STATEMENTS);



  



 
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["User", "status", "Created", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, Account, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Typography variant="h40" style={{color: "#3855E5", fontSize: 12, marginBottom: -10}}>
            Search by account number, ID NO, Name, Company Reg
          </Typography>
      <Input
            size="lg"
            type="text"
            placeholder="Search..."
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
      <Card>
      
        <CardHeader variant="gradient" color="" style={{backgroundColor: "#3855E5"}} className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Statements
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Account Number", "Account Holder","Date", "Province"].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
            {allStatements && allStatements.getAllStatements.map((statement, index) => (
              
  <tr key={index}>
    <td className="py-3 px-5">
          
            {statement.accountNumber}
         
    </td>
    <td className="py-3 px-5">
      <Typography className="text-xs font-normal text-blue-gray-500">
        {statement.consumerName}
      </Typography>
    </td>
    <td className="py-3 px-5">
    {statement.createdAt && statement.createdAt.substring(0, 10)}
    </td>
 
    <td className="">
      <Typography
        className="text-xs font-semibold text-blue-gray-600"
      >
        {statement.province}
      </Typography>
    </td>
    <td className="py-3 px-5">
      <Typography
        as="a"
        href="#"
        className="text-xs font-semibold text-blue-gray-600"
      >
        Download
      </Typography>
    </td>
  </tr>
))}



            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
