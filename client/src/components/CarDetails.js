import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Image, Item, Button,Modal,Form,Header } from "semantic-ui-react";

const models = [];
for (let i = 2021; i > 1850; i--) {
  models.push(i);
}

const options = models.map((a) => ({ key: a, text: a, value: a }));

function CarDetails() {
  let { id } = useParams();

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [engineVolume, setEngineVolume] = useState(0);
  const [enginePower, setenginePower] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    axios.get(`https://devbasesample.herokuapp.com/api/cars/${id}`).then((car) => {
      setCar(car.data);
      setBrand(car.data.brand);
      setModel(car.data.model);
      setImage(car.data.image);
      setDescription(car.data.description);
      setEngineVolume(car.data.engineVolume);
      setenginePower(car.data.enginePower);
      setPrice(car.data.price);
      setStock(car.data.stock);
    });
  }, []);

  
  const handleUpdate = (e) => {
    e.preventDefault();

    let car = {
      brand: brand,
      model: model,
      image: image,
      description: description,
      engineVolume: engineVolume,
      enginePower: enginePower,
      price: price,
      stock: stock,
    };

    axios
      .put(`/api/cars/${id}`, car)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setCar(car);

    setOpen(false);
  };
  
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handleModelChange = (e, { value }) => {
    setModel(value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleEngineVolumeChange = (e) => {
    setEngineVolume(e.target.value);
  };
  const handleEnginePowerChange = (e) => {
    setenginePower(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleStockChange = (e) => {
    setStock(e.target.value);
  };


  const handleDelete=(e)=>{
      axios.delete(`https://devbasesample.herokuapp.com/api/cars/${id}`)
      .then(res=>window.location="/")
  }

  return (
    <>
      <Item.Group>
        <Item>
          <Item.Image size="large" src={car.image} />

          <Item.Content>
            <Item.Header as="a">{car.brand}</Item.Header>
            <Item.Meta>Model:{car.model}</Item.Meta>
            <Item.Description>{car.description}</Item.Description>
            <Item.Extra style={{ marginTop: "150px" }}>
              EngineVolume:{car.engineVolume + " cc"}-- EnginePower:
              {car.enginePower + " hp"}
            </Item.Extra>
          <Button onClick={handleDelete} color="red">Delete</Button>
          <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button color="yellow">Edit</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={image} wrapped />
          <Modal.Description>
            <Form style={{ width: "400px" }} onSubmit={handleUpdate}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  type="text"
                  value={brand}
                  label="Brand"
                  placeholder="Ex:Audi A4"
                  onChange={handleBrandChange}
                />
                <Form.Select
                  fluid
                  label="Model"
                  options={options}
                  value={model}
                  placeholder="Model"
                  onChange={handleModelChange}
                />
                <Form.Input
                  fluid
                  label="Image link"
                  value={image}
                  placeholder="Ex:http:pixabay...."
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Engine Volume"
                  value={engineVolume}
                  placeholder="Ex:1600cc"
                  onChange={handleEngineVolumeChange}
                />
                <Form.Input
                  fluid
                  label="Engine Power"
                  value={enginePower}
                  placeholder="Ex:125 hp"
                  onChange={handleEnginePowerChange}
                />
              </Form.Group>

              <Form.TextArea
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Tell us more about car..."
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Price"
                  value={price}
                  placeholder="Ex:500000 TL"
                  onChange={handlePriceChange}
                />
                <Form.Input
                  fluid
                  label="Stock"
                  value={stock}
                  placeholder="Ex:120 piece"
                  onChange={handleStockChange}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            positive
            content="Save car"
            labelPosition="right"
            icon="checkmark"
            onClick={handleUpdate}
          />
        </Modal.Actions>
      </Modal>

          </Item.Content>
        </Item>
      </Item.Group>
    </>
  );
}

export default CarDetails;
