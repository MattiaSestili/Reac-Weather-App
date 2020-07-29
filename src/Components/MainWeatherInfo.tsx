import * as React from "react";
import { IWeather, IMainInfo } from "./Forecast";
import { Col, Form, Row } from "react-bootstrap";

interface IMainWeatherProps {
  Weather: IWeather;
  Main: IMainInfo;
  Name: string;
  Country: string;
}

export class MainWeatherInfo extends React.PureComponent<IMainWeatherProps> {
  public render(): JSX.Element {
    const p = this.props;
    if (!p.Weather) {
      return null;
    }

    return (
      <Form>
        <Form.Group
          as={Row}
          controlId="formPlaintextMainWeather"
          style={{
            border: "1px solid white",
            borderRadius: "6px",
          }}
        >
          <Col sm="6">
            <h4 style={{ marginTop: "1rem" }}>{p.Name + ", " + p.Country}</h4>
            <h5>{p.Weather.main}</h5>
            <img
              style={{ width: "100%" }}
              src={"http://openweathermap.org/img/w/" + p.Weather.icon + ".png"}
              alt=""
            />
          </Col>

          <Col sm="6" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
            <p>{p.Main.temp} &#8451;</p>
            <p className="textAlignCenter">{p.Weather.main}</p>
            <p className="textAlignCenter">
              <span>
                <small>Feels like</small>
              </span>
              {" " + p.Main.feels_like} &#8451;
            </p>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}
