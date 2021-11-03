import * as RB from "react-bootstrap";
import data from "../SampleData";
import Card from "./Card";

const Tabs = () => {
  return (
    <RB.Container className="mt-5">
      <RB.Tabs
        defaultActiveKey="portfolios"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <RB.Tab eventKey="portfolios" title="Portfolios">
          <RB.Table striped bordered hover>
            <tbody style={{ textAlign: "center" }}>
              {data.results.map((basket) => {
                return <Card basket={basket} />;
              })}
            </tbody>
          </RB.Table>
        </RB.Tab>
        <RB.Tab eventKey="watchlist" title="Watchlist">
          Watchlist
        </RB.Tab>
      </RB.Tabs>
    </RB.Container>
  );
};

export default Tabs;
