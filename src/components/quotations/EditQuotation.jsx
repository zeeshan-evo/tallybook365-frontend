import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditQuotation.module.scss";
import { configuration } from "../../configurations/configurations";
import useAxios from "../../hooks/useAxios";
import { instance } from "../../utilities/axiosInstance";
import useToggler from "../../hooks/useToggler";
import { MdAddCircle, MdDelete } from "react-icons/md";

export default function EditQuotation() {
  const { quotationId } = useParams();
  const [response, error, loading, axiosFetch, message] = useAxios();
  const [
    responseUpdate,
    errorUpdate,
    loadingUpdate,
    axiosFetchUpdate,
    messageUpdate,
  ] = useAxios();
  const [data, setData] = useState({});
  const [inputList, setInputList] = useState([
    {
      particulars: "",
      details: "",
      quantity: "",
      day: "",
      unitPrice: "",
      totalPrice: "",
    },
  ]);
  const [getData, setGetData] = useToggler();

  function handleChange(event) {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const editQuotationAsync = (e) => {
    e.preventDefault();
    console.log(data);
    axiosFetchUpdate({
      axiosInstance: instance,
      method: "Patch",
      url: `${configuration.quotations}/${quotationId}`,
      requestConfig: data,
    });
    setGetData();
  };

  const getClientDetails = () => {
    axiosFetch({
      axiosInstance: instance,
      method: "Get",
      url: `${configuration.quotations}/${quotationId}`,
    });
  };

  useEffect(() => {
    getClientDetails();
  }, [getData]);

  useEffect(() => {
    //checking if response has its values
    if (response.data) {
      //setting data to data
      setData(response?.data);
      //setting items values to inputlist to view on client site
      setInputList(response?.data?.items);
    }
  }, [response]);

  useEffect(() => {
    // calculating total from items
    var sum = 0;
    inputList.map((input, i) => {
      sum = sum + parseInt(input.totalPrice);
    });
    //setting the grand total in data object and the items array in data object
    setData({ ...data, grand_total: sum, items: inputList });
  }, [inputList]);

   // handle input change
   const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    //summation of total in a single row
    let rowSum = (inputList[index]?.quantity
      ? inputList[index]?.quantity
      : 1) * (inputList[index]?.day
      ? inputList[index]?.day
      : 1 )* (inputList[index]?.unitPrice
      ? inputList[index]?.unitPrice
      : 1);

    //saving total price in list
    list[index]["totalPrice"] = rowSum;

    //updating input list
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        particulars: "",
        details: "",
        quantity: "",
        day: "",
        unitPrice: "",
        totalPrice: "",
      },
    ]);
  };

  // items...
  const itemsAddInObject = inputList.map((x, i) => {
    return (
      <div className={Styles.itemsContainer} key={i}>
        <input
          type="text"
          name="particulars"
          placeholder="Enter items"
          value={x.particulars}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="text"
          name="details"
          placeholder="Enter details"
          value={x.details}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Last quantity"
          value={x.quantity}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="day"
          placeholder="Enter day"
          value={x.day}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="unitPrice"
          placeholder="Enter unit price"
          value={x.unitPrice}
          onChange={(e) => handleInputChange(e, i)}
        />
        <input
          type="number"
          name="totalPrice"
          readOnly
          placeholder="Enter total price"
          value={inputList[i]?.totalPrice}
        />
        <div className={Styles.btnBox}>
          {inputList.length !== 1 && (
            <MdDelete
              className={Styles.remove}
              onClick={() => handleRemoveClick(i)}
            />
          )}
          {inputList.length - 1 === i && (
            <MdAddCircle className={Styles.add} onClick={handleAddClick} />
          )}
        </div>
      </div>
    );
  });

  return (
    <div className={Styles.main}>
      <form onSubmit={editQuotationAsync}>
        <input
          type="text"
          placeholder="Enter User id"
          name="user_id"
          onChange={handleChange}
          value={data?.user_id}
          readOnly
        />
        <br />
        <label>Client info</label>
        <input
          type="text"
          placeholder="Enter client id"
          name="client_id"
          onChange={handleChange}
          value={data?.client_id}
        />
        <input
          type="text"
          placeholder="Enter Client's name"
          name="client_name"
          onChange={handleChange}
          value={data?.client_name}
        />
        <input
          type="text"
          placeholder="Enter Client's address"
          name="client_address"
          onChange={handleChange}
          value={data?.client_address}
        />
        <br />
        <label>Add quotation info</label>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={handleChange}
          value={data?.title}
        />
        <input
          type="number"
          placeholder="Enter Job no"
          name="job_no"
          onChange={handleChange}
          value={data?.job_no}
        />
        <input
          type="text"
          placeholder="Enter Brand name"
          name="brand"
          onChange={handleChange}
          value={data?.brand}
        />
        <input
          type="text"
          placeholder="Enter Job type"
          name="job_type"
          onChange={handleChange}
          value={data?.job_type}
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={data?.date?.slice(0, 10)}
        />
        <br />
        <label>Add items</label>
        {itemsAddInObject}
        <br />
        <label>Payment info</label>
        <input
          type="text"
          placeholder="Enter bank account no"
          name="bank_account"
          onChange={handleChange}
          value={data?.bank_account}
        />
        <input
          type="text"
          placeholder="Enter bank name address"
          name="bank_name_address"
          onChange={handleChange}
          value={data?.bank_name_address}
        />
        <input
          type="text"
          placeholder="Enter swift no"
          name="swift"
          onChange={handleChange}
          value={data?.swift}
        />
        <input
          type="text"
          placeholder="Enter routing no"
          name="routing_no"
          onChange={handleChange}
          value={data?.routing_no}
        />
        <input
          type="number"
          placeholder="Enter ASF percentage"
          name="asf"
          value={data?.asf}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter vat percentage"
          name="vat"
          onChange={handleChange}
          value={data?.vat}
        />
        <br />
        <label>Terms and condition</label>
        <textarea
          name="t_and_c"
          cols="30"
          rows="10"
          onChange={handleChange}
          value={data?.t_and_c}
        ></textarea>
        <p>{message}</p>
        <p>{messageUpdate}</p>
        <button type="submit">Save</button> <br />
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
