import * as RB from "react-bootstrap";
import classes from "./Card.module.css";

const Card = (props) => {
  const assests = props.basket.basket_items.map(
    (basket_item) => basket_item.coin_name
  );

  return (
    <tr className={classes.row}>
      <td>
        <img src={props.basket.basket_logo_url} alt="Basket_Logo" />
      </td>
      <td colSpan="2">
        <RB.Stack gap={3}>
          <div>
            <span>Basket:</span> <b>{props.basket.name}</b>
          </div>
          <div>
            <span>Assests:</span> {assests.join()}
          </div>
          <div>
            <span>Manager:</span> {props.basket.manager_name}
          </div>
        </RB.Stack>
      </td>
      <td>
        <span>Investment Value</span>
        <p>₹1,01,198</p>
      </td>
      <td>
        <span>Cuurent Value</span>
        <p>₹1,32,456</p>
      </td>
      <td>
        <span>Returns</span>
        <p>1113%</p>
      </td>
    </tr>
  );
};

export default Card;
