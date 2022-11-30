import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Popup/Popup";
import TemperCreate from "../TemperCreate/TemperCreate";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import "./Create.css";
import { getDogs } from "../../store/actions";

function Form() {
  const global_state = useSelector((state) => state);
  let groups = getGroups(global_state.dogs);
  let bred_for = getBredFor(global_state.dogs);
  const [trigger, setTrigger] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    image: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    min_lifetime: "",
    max_lifetime: "",
    tempers: [],
    group: "",
    purpose: "",
  });
  const [errors, setErrors] = useState(data);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...data,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleOnTemper = (e) => {
    setData((prevData) => {
      if (!prevData.tempers.includes(e.target.value))
        prevData.tempers.push(e.target.value);
      return { ...prevData };
    });
  };

  const onClose = (temper) => {
    setData((prevData) => {
      prevData.tempers = prevData.tempers.filter((temp) => temp !== temper);
      return { ...prevData };
    });
  };

  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      for (const error in errors) {
        if (error !== "group" && error !== "purpose" && error !== "tempers") {
          if (errors[error]?.length) {
            setTrigger(true);
            setLoading(false);
            return setMessage(errors[error]);
          }
        }
      }

      if (!data.tempers.length) {
        setTrigger(true);
        setLoading(false);
        return setMessage("At least a temper must be selected");
      }

      const body = {
        name: data.name,
        image: data.image,
        height: data.min_height + " - " + data.max_height,
        weight: data.min_weight + " - " + data.max_weight,
        life_span: data.min_lifetime + " - " + data.max_lifetime,
        temperament: data.tempers,
        breed_group: data.group,
        bred_for: data.purpose,
      };

      for (const att in body) {
        if (!body[att].length) body[att] = null;
      }
      const res = await axios
        .post("http://localhost:3001/dogs", body)
        .catch((err) => {
          console.log(err);
        });

      setData({
        name: "",
        image: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_lifetime: "",
        max_lifetime: "",
        tempers: [],
        group: "",
        purpose: "",
      });
      setLoading(false);

      if (res.status === 201) {
        setTrigger(true);
        getDogs()(dispatch);
        return setMessage("Succesfully added");
      } else {
        setTrigger(true);
        return setMessage("There was an error while creating it");
      }
    } catch (error) {
      setTrigger(true);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="createContainer">
        <div className="createInnerContainer">
          {loading ? (
            <div className="innerCreateContainer">
              <Loader />
            </div>
          ) : (
            <div className="innerCreateContainer">
              <h1 className="createTitle">Add a new breed</h1>
              <hr />
              <form onSubmit={handleOnSubmit}>
                <div className="createContent">
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Name:</h3>
                    <input
                      className="detailDesc"
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                  <span className="errorMsg">{errors.name}</span>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Image</h3>
                    <input
                      className="detailDesc"
                      type="text"
                      name="image"
                      placeholder="Url"
                      onChange={handleOnChange}
                    />
                  </div>
                  <p className="errorMsg">{errors.image}</p>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Height:</h3>
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="min_height"
                      placeholder="Min. height"
                      onChange={handleOnChange}
                      required
                    />
                    -
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="max_height"
                      placeholder="Max. height"
                      onChange={handleOnChange}
                      required
                    />
                    <h5 className="desc">Inch.</h5>
                  </div>
                  <p className="errorMsg">{errors.max_height}</p>
                  <p className="errorMsg">{errors.min_height}</p>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Weight:</h3>
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="min_weight"
                      placeholder="Min. weight"
                      onChange={handleOnChange}
                      required
                    />
                    -
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="max_weight"
                      placeholder="Max. weight"
                      onChange={handleOnChange}
                      required
                    />
                    <h5 className="desc">Lbs.</h5>
                  </div>
                  <p className="errorMsg">{errors.min_weight}</p>
                  <p className="errorMsg">{errors.max_weight}</p>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Life span:</h3>
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="min_lifetime"
                      placeholder="Min. lifetime"
                      onChange={handleOnChange}
                      required
                    />
                    -
                    <input
                      className="detailDesc inputCreate"
                      type="text"
                      name="max_lifetime"
                      placeholder="Max. lifetime"
                      onChange={handleOnChange}
                      required
                    />
                    <h5 className="desc">Years</h5>
                  </div>
                  <p className="errorMsg">{errors.min_lifetime}</p>
                  <p className="errorMsg">{errors.max_lifetime}</p>
                </div>
                <div className="createContent">
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Group:</h3>
                    <select
                      className="detailDesc selectCreate"
                      name="group"
                      id="group"
                      defaultValue={"default"}
                      onChange={handleOnChange}
                      required
                    >
                      <option value="default">Select a group:</option>
                      {groups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Bred for:</h3>
                    <select
                      className="detailDesc selectCreate"
                      name="purpose"
                      id="purpose"
                      defaultValue={"default"}
                      onChange={handleOnChange}
                      required
                    >
                      <option value="default">Select a purpose:</option>
                      {bred_for.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="detailLabelContainer">
                    <h3 className="detailLabel">Temperaments:</h3>
                    <select
                      className="detailDesc selectCreate"
                      name="tempers"
                      id="tempers"
                      defaultValue={"default"}
                      onChange={handleOnTemper}
                    >
                      <option value="default">Select a temperament:</option>
                      {global_state.tempers.map((temper) => (
                        <option key={temper} value={temper}>
                          {temper}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="tempersList">
                    {data.tempers.map((temper, id) => (
                      <TemperCreate
                        key={temper + id}
                        onClose={onClose}
                        id={temper}
                        text={temper}
                      />
                    ))}
                  </div>
                </div>
                <div className="createAddBtnContainer">
                  <button className="createAddBtn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Popup trigger={trigger} setTrigger={setTrigger}>
        <p>{message}</p>
      </Popup>
      <Footer />
    </div>
  );
}

const validateName = (name) => {
  if (!name) {
    return "Name is required";
  } else if (/(?=.*\d)/.test(name)) {
    return "Name cannot have numbers";
  } else {
    return "";
  }
};

const validateImg = (image) => {
  if (image) {
    try {
      const url = image.split(".");
      const lastPart = (url[url.length - 1] + "").toLowerCase();
      if (
        !lastPart.endsWith("jpeg") &&
        !lastPart.endsWith("jpg") &&
        !lastPart.endsWith("png")
      ) {
        return "It must be a .jpeg or .jpg or .png file";
      } else {
        return "";
      }
    } catch (error) {
      return "It must be a proper url";
    }
  }
};

const validateMinWeight = (min_weight) => {
  if (!min_weight) {
    return "Minimun weight is required";
  } else if (!Number(min_weight)) {
    return "Minimun weight must be a number";
  } else if (parseInt(min_weight) < 3) {
    return "I doubt that breed is lighter than 3 lbs";
  } else {
    return "";
  }
};

const validateMaxWeight = (max_weight) => {
  if (!max_weight) {
    return "Maximum weight is required";
  } else if (!Number(max_weight)) {
    return "Maximum weight must be a number";
  } else {
    return "";
  }
};

const validateMinHeight = (min_height) => {
  if (!min_height) {
    return "Minimun height is required";
  } else if (!Number(min_height)) {
    return "Minimun height must be a number";
  } else if (parseInt(min_height) < 3) {
    return "I doubt that breed is smaller than 5 Inches";
  } else {
    return "";
  }
};

const validateMaxHeight = (max_height) => {
  if (!max_height) {
    return "Maximum height is required";
  } else if (!Number(max_height)) {
    return "Maximum height must be a number";
  } else {
    return "";
  }
};

const validateMinLifespan = (min_lifetime) => {
  if (!min_lifetime) {
    return "Minimun lifetime is required";
  } else if (!Number(min_lifetime)) {
    return "Minimun lifetime must be a number";
  } else if (parseInt(min_lifetime) < 3) {
    return "I doubt that breed lives less than 7 years";
  } else {
    return "";
  }
};

const validateMaxLifespan = (max_lifetime) => {
  if (!max_lifetime) {
    return "Maximum lifetime is required";
  } else if (!Number(max_lifetime)) {
    return "Maximum lifetime must be a number";
  } else {
    return "";
  }
};

const validate = (data) => {
  let errors = { ...data };

  errors.name = validateName(data.name);
  errors.image = validateImg(data.image);

  // Check for weight
  errors.min_weight = validateMinWeight(data.min_weight);
  errors.max_weight = validateMaxWeight(data.max_weight);

  if (parseInt(data.min_weight) >= parseInt(data.max_weight)) {
    errors.max_weight = "Maximum weight should be bigger than minimum";
  }

  // Check for height
  errors.min_height = validateMinHeight(data.min_height);
  errors.max_height = validateMaxHeight(data.max_height);

  if (parseInt(data.min_height) >= parseInt(data.max_height)) {
    errors.max_height = "Maximum height should be bigger than minimum";
  }

  // Check life span
  errors.min_lifetime = validateMaxLifespan(data.min_lifetime);
  errors.max_lifetime = validateMinLifespan(data.max_lifetime);

  if (parseInt(data.min_lifetime) >= parseInt(data.max_lifetime)) {
    errors.max_lifetime = "Maximum lifetime should be bigger than minimum";
  }

  return errors;
};

const getGroups = (dogs) => {
  let groups = [];
  for (const dog of dogs) {
    if (!groups.includes(dog.breed_group) && dog.breed_group)
      groups.push(dog.breed_group);
  }

  groups.sort();

  return groups;
};

const getBredFor = (dogs) => {
  let bred_for = [];
  for (const dog of dogs) {
    if (!bred_for.includes(dog.bred_for) && dog.bred_for)
      bred_for.push(dog.bred_for);
  }

  bred_for.sort();
  return bred_for;
};

export default Form;
