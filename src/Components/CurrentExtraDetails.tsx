import * as React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { IMainInfo, ISystemInfo } from "./Forecast";

interface ICurrentExtraDetailsProps {
  Main: IMainInfo;
  Sys: ISystemInfo;
}
export class CurrentExtraDetails extends React.PureComponent<
  ICurrentExtraDetailsProps
> {
  public render(): JSX.Element {
    const p = this.props;
    if (!p.Sys) {
      return null;
    }

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // TODO consider using momentjs for a more sensible conversion. Keeping it simple for now
    const sunriseDate = new Date(p.Sys.sunrise * 1000);
    const sunsetDate = new Date(p.Sys.sunset * 1000);
    // Hours part from the timestamp
    const sriseHours =
      sunriseDate.getHours() < 5
        ? "0" + sunriseDate.getHours()
        : sunriseDate.getHours();
    const ssetHours = sunsetDate.getHours();
    // Minutes part from the timestamp
    const sriseMin = "0" + sunriseDate.getMinutes();
    const ssetMin = "0" + sunsetDate.getMinutes();

    return (
      <Form>
        <Form.Group
          as={Row}
          className="justify-content-md-center"
          controlId="formPlaintextMaxTemp"
          style={{
            border: "1px solid white",
            borderRadius: "6px",
            padding: "6rem 0px",
            backgroundColor: "#c3c6ca6e",
          }}
        >
          <Col sm="4">
            <Form.Label>{p.Main.temp_max} &#8451;</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="High"
              style={{ color: "white", textAlign: "center" }}
            />

            <Form.Label>{p.Main.temp_min} &#8451;</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="Low"
              style={{ color: "white", textAlign: "center" }}
            />
          </Col>

          <Col sm="4">
            <Form.Label>{p.Main.pressure} mb</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="Pressure"
              style={{ color: "white", textAlign: "center" }}
            />

            <Form.Label>{p.Main.humidity} %</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="Humidity"
              style={{ color: "white", textAlign: "center" }}
            />
          </Col>

          <Col sm="4">
            <Form.Label>{sriseHours + ":" + sriseMin.substr(-2)}</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="Sunrise"
              style={{ color: "white", textAlign: "center" }}
            />

            <Form.Label>{ssetHours + ":" + ssetMin.substr(-2)}</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue="Sunset"
              style={{ color: "white", textAlign: "center" }}
            />
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
