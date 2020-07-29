import * as React from "react";
import { APIForecast, ICurrentForecast } from "./Forecast";
import { MainWeatherInfo } from "./MainWeatherInfo";
import { Container, Row, Form, Col, Button, Alert } from "react-bootstrap";
import { CurrentExtraDetails } from "./CurrentExtraDetails";

interface ILayoutState {
  CurrentWeather: ICurrentForecast;
  City: string;
  ErrorMessage: string;
}

export class Layout extends React.PureComponent<{}, ILayoutState> {
  public constructor(p: {}) {
    super(p);
    this.state = {
      CurrentWeather: null,
      City: null,
      ErrorMessage: null,
    };
  }

  public componentDidMount() {
    this._fetchFromServer();
  }

  public render(): JSX.Element {
    const s = this.state;
    return (
      <Container fluid="sm">
        {s.ErrorMessage && (
          <Alert variant={"danger"} style={{ padding: 0 }}>
            {"Please try again - Error: " + s.ErrorMessage}
          </Alert>
        )}

        <Form>
          <Form.Row
            className="align-items-center"
            style={{ marginBottom: "12rem" }}
          >
            <Col>
              {/* Search field */}
              <Form.Control
                className="mb-2"
                placeholder="Enter city"
                value={s.City ?? ""}
                onChange={this._onTextChanged}
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  // Enter key pressed
                  if (event.key === "Enter") {
                    event.preventDefault();
                    this._fetchFromServer();
                  }
                }}
              />
            </Col>

            <Col xs="auto">
              <Button className="mb-2" onClick={this._fetchFromServer}>
                Search
              </Button>
            </Col>
          </Form.Row>
        </Form>

        <Row>
          {/* Main weather info */}
          <Col sm="6">
            <MainWeatherInfo
              Weather={s.CurrentWeather?.weather[0]}
              Main={s.CurrentWeather?.main}
              Country={s.CurrentWeather?.sys?.country}
              Name={s.CurrentWeather?.name}
            />
          </Col>

          <Col sm="6">
            <CurrentExtraDetails
              Main={s.CurrentWeather?.main}
              Sys={s.CurrentWeather?.sys}
            />
          </Col>
        </Row>

        <Row>
          {/* Forecast  hourly from today till the next 3 days*/}
          <Col>{}</Col>
        </Row>
      </Container>
    );
  }

  private readonly _onTextChanged = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    if (value != null) {
      this.setState({ City: value });
    }
  };

  private readonly _fetchFromServer = async () => {
    try {
      const city = this.state.City ?? undefined;
      const current = await APIForecast.GetCurrentWeather(city);
      if (current.cod === "404") {
        this.setState({ ErrorMessage: current.message });
      } else if (!!current) {
        this.setState({
          CurrentWeather: current,
          ErrorMessage: null,
        });
      }
    } catch (e) {
      throw new Error("API call returned error. Current Weather not loaded! ");
    }
  };
}
