import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./Table";
import { IPerson } from "./TableTypes";

type Response = {
  data: IPerson[];
};

export function TableData() {
  const quantityOptions = [
    { label: 10, value: "10" },
    { label: 15, value: "15" },
    { label: 30, value: "30" },
    { label: 50, value: "50" },
  ];

  const [value, setValue] = useState<string>("10");
  const [data, setData] = useState<IPerson[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const handleChangeEvent: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const fetchData = async (quantity: string) => {
    try {
      const uri = `https://fakerapi.it/api/v1/persons?_quantity=${quantity}`;
      const response = await axios.get<Response>(uri);
      setLoader(false);
      setData(response.data.data);
    } catch (e) {
      setLoader(false);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData(value);
  }, [value]);

  return (
    <>
      <div>{loader && <div className="txt-center txt-m">Loading</div>}</div>
      {!loader && (
        <div className="txt-center txt-m m-xs p-xs">
          <label>
            {" "}
            Number of Rows:{" "}
            <select
              value={value}
              onChange={handleChangeEvent}
              className="txt-m"
            >
              {quantityOptions.map((quantity) => (
                <option value={quantity.value} key={quantity.label}>
                  {quantity.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {!loader && <Table data={data} />};
    </>
  );
}
