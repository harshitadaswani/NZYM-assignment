import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./Table";
import { IPerson } from "./TableTypes";

type Response = {
    data: IPerson[];
}

export function TableData() {
  const [data, setData] = useState<IPerson[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  console.log(data);
  const fetchData = async () => {
    try {
      const uri = "https://fakerapi.it/api/v1/persons";
      const response = await axios.get<Response>(uri);
        setLoader(false);
        // console.log(response.data);
      setData(response.data.data);
    } catch (e) {
      setLoader(false);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>{loader && <div>Loading</div>}</div>
      {data && <Table data={data} />};
    </>
  );
}
