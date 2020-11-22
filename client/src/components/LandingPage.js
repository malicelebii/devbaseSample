import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Button,
  Image,
  Modal,
  Header,
  Icon,
  Form,
  Input,
} from "semantic-ui-react";
import Car from "./Car";

const models = [];
for (let i = 2021; i > 1850; i--) {
  models.push(i);
}

const options = models.map((a) => ({ key: a, text: a, value: a }));


const LandingPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [engineVolume, setEngineVolume] = useState(0);
  const [enginePower, setenginePower] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [filteredCars, setFilteredCars] = useState("");
  const [color, setColor] = useState("gray")
  const [color2, setColor2] = useState("gray")
  

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

  useEffect(() => {
    axios.get("https://devbasesample.herokuapp.com/api/cars").then((res) => setData(res.data));
  }, []);

  const onSubmit = (e) => {
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
      .post("https://devbasesample.herokuapp.com/api/cars", car)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setData([...data, car]);

    setOpen(false);
  };

  const filterChange = (e) => {
    setFilteredCars(e.target.value);
  };


  const sortBy = (e) => {
    let sorted = [...data]
    if (e.target.value == "artan") {
      sorted.sort((a, b) => (a.price < b.price ? 1 : -1));
        setData(sorted)
        setColor("green")
        setColor2("gray")
      }
    if (e.target.value == "azalan") {
      sorted.sort((a, b) => (a.price < b.price ? -1 : 1));
     setData(sorted)
     setColor("gray")
        setColor2("green")
    }
  };

  


  return (
    <>
      <span style={{ display: "flex", justifyContent: "center" }}>
        <Button color={color} onClick={sortBy}  value="artan">
        Azalan fiyat
        </Button>
        <Button color={color2} onClick={sortBy} value="azalan">
        Artan fiyat
        </Button>
       
        <Input placeholder="Marka girin" onChange={filterChange} />
      </span>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button positive> <Icon name="plus"/> Add car</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image size="medium" src={image} wrapped />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <Form style={{ width: "400px" }} onSubmit={onSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  type="text"
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
                  placeholder="Ex:http:pixabay...."
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Engine Volume"
                  placeholder="Ex:1600cc"
                  onChange={handleEngineVolumeChange}
                />
                <Form.Input
                  fluid
                  label="Engine Power"
                  placeholder="Ex:125 hp"
                  onChange={handleEnginePowerChange}
                />
              </Form.Group>

              <Form.TextArea
                label="Description"
                onChange={handleDescriptionChange}
                placeholder="Tell us more about car..."
              />
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Price"
                  placeholder="Ex:500000 TL"
                  onChange={handlePriceChange}
                />
                <Form.Input
                  fluid
                  label="Stock"
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
            onClick={onSubmit}
          />
        </Modal.Actions>
      </Modal>
      <Car data={data} filteredCars={filteredCars} />

    </>
  );
};

export default LandingPage;
