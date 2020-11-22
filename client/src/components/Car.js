import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Grid } from "semantic-ui-react";

function Car(props) {
  let cars = props.filteredCars
    ? props.data.filter((car) => car.brand == props.filteredCars)
    : props.data;

  cars = cars.map((car) => (
    <Grid.Column width={4} style={{ marginTop: "20px" }}>
      <Link to={`https://devbasesample.herokuapp.com/cars/${car._id}`}>
        <Card
          style={{ width: "400px", height: "400px" }}
          image={car.image}
          header={car.brand}
          meta={car.model}
          description={car.description}
          extra={
            <a>
              <Icon name="money bill alternate" />
              {car.price + " "} TL
              <span style={{ display: "flex", float: "right" }}>
                {car.stock + " adet "}
              </span>
            </a>
          }
        />
      </Link>
    </Grid.Column>
  ));

  return (
    <>
      <Grid>
        <Grid.Row>{cars}</Grid.Row>
        {console.log(props.data)}
      </Grid>
      {}
    </>
  );
}

export default Car;
