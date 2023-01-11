import React from "react";
import classes from "./Table.module.scss";

export default function Table({ lists, productionCost }) {
  //Calculate other amounts with grand total
  let agencyFees = productionCost * 0.1;
  let subTotal = productionCost + agencyFees;
  let vat = subTotal * 0.15;
  let gTotal = subTotal + vat;

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <th>Sl</th>
            <th>Particulars</th>
            <th>Quantity</th>
            <th>Day</th>
            <th>Unit Price (BDT)</th>
            <th>Total (BDT)</th>
          </tr>

          {lists.map((list, i) => (
            <tr key={i}>
              <td className={classes.itemCentered}>{i + 1} </td>
              <td>{list?.particulars}</td>
              <td className={classes.itemCentered}>{list?.quantity}</td>
              <td className={classes.itemCentered}>{list?.day}</td>
              <td className={classes.itemRight}>{list?.unitPrice}</td>
              <td className={classes.itemRight}>{list?.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className={classes.calculation1}>
          <p>
            <b>Total Production Cost</b>
          </p>
          <p>
            <b>{(Math.round(productionCost * 100) / 100).toFixed(2)}</b>
          </p>
        </div>
        <div className={classes.calculation}>
          <p>Agency Management Fees 10%</p>
          <p>{(Math.round(agencyFees * 100) / 100).toFixed(2)}</p>
        </div>
        <div className={classes.calculation}>
          <p>
            <b>Sub Total</b>
          </p>
          <p>
            <b>{(Math.round(subTotal * 100) / 100).toFixed(2)}</b>
          </p>
        </div>
        <div className={classes.calculation}>
          <p>VAT 15%</p>
          <p>{(Math.round(vat * 100) / 100).toFixed(2)}</p>
        </div>
        <div className={classes.calculationGrandTotal}>
          <p>
            <b>Grand Total Amount</b>
          </p>
          <p>
            <b>{Math.round(gTotal).toFixed(2)}</b>
          </p>
        </div>
      </div>
    </div>
  );
}