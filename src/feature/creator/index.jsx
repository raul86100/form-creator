import React, { useRef, useState } from "react";
import "./index.scss";
import { Modal } from "antd";
import axios from "axios";
import { apiConstant } from "../../constant/apiConatant";

const ItemsTool = [
  {
    type: "input",
    inputType: "text",
    id: "input1",
    placeholder: "Enter text",
    label: "Label Short",
    minLength: 0,
    maxLength: 250,
  },
  {
    type: "textarea",
    id: "textarea1",
    placeholder: "Enter more text",
    label: "Label Long",
    minLength: 0,
    maxLength: 250,
  },
  { type: "range", id: "range1", label: "Label range" },
  {
    type: "radio",
    id: "radio1",
    label: "Label Radio",
    options: [{ label: "yes" }, { label: "no" }],
  },
  {
    type: "checkbox",
    id: "checkbox1",
    label: "Label Check",
    options: [{ label: "Default Value" }],
  },
  { type: "submit", label: "Submit", id: "submit1" },
];

export const Creator = () => {
  const workspaceRef = useRef(null);
  const [workspace, setWorkspace] = useState("Form");
  const [selectedItem, setSelectedItem] = useState({ index: 0, item: null });
  const [isEdit, setIsEdit] = useState(false);
  const [sourceItems, setSourceItems] = useState(ItemsTool);
  const [destinationItems, setDestinationItems] = useState([]);

  const onDragStart = (event, item) => {
    event.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const onDrop = (event, isSource) => {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData("application/json"));

    if (isSource) {
      setDestinationItems(destinationItems.filter((i) => i.id !== item.id));
      setSourceItems([...sourceItems, item]);
    } else {
      setDestinationItems([...destinationItems, item]);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
  };

  const renderFormElement = (item) => {
    switch (item.type) {
      case "input":
        return (
          <label
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            {item.label}
            <input
              type={item.inputType}
              name={item.id}
              placeholder={item.placeholder}
              minLength={item.minLength}
              maxLength={item.maxLength}
              onClick={(e) => e.stopPropagation()}
              style={{ padding: "5px" }}
            />
          </label>
        );
      case "textarea":
        return (
          <label
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            {item.label}
            <textarea
              name={item.id}
              placeholder={item.placeholder}
              onClick={(e) => e.stopPropagation()}
              style={{ padding: "5px" }}
            ></textarea>
          </label>
        );
      case "range":
        return (
          <label
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            {item.label}
            <input
              type="range"
              name={item.id}
              onClick={(e) => e.stopPropagation()}
            />
          </label>
        );
      case "radio":
        return (
          <fieldset style={{ border: "none" }} name={item.id}>
            <legend
              key={item.id}
              style={{ display: "flex", flexDirection: "column", gap: "10px" ,fontWeight:"bold"}}
            >
              {item.label}
            </legend>

            {item.options.map((option, index) => (
              <label
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  width: "fit-content",
                  alignItems: "center",
                  gap: "5px",
                  flexDirection: "row",
                }}
                key={index}
              >
                <input type="radio" name={item.id} value={option.label} />
                {option.label}
              </label>
            ))}
          </fieldset>
        );
      case "checkbox":
        return (
          <label
            key={item.id}
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {item.label}
            {item.options.map((option, index) => (
              <section key={index} style={{ display: "flex" }}>
                <input type="checkbox" name={item.id} value={option.label} />
                {option.label}
              </section>
            ))}
          </label>
        );
      case "submit":
        return (
          <button
            key={item.id}
            type="submit"
            onClick={(e) => e.stopPropagation()}
          >
            {item.label}
          </button>
        );
      default:
        return null;
    }
  };

  const renderButton = (item) => {
    return (
      <button
        key={item.id}
        draggable
        onDragStart={(e) => onDragStart(e, item)}
        type="button"
      >
        {item.type}
      </button>
    );
  };

  const handleGetContent = async () => {
    if (workspaceRef.current) {
      const content = workspaceRef.current.innerHTML;
      console.log(content);
      const formSubmit = await axios({
        url: apiConstant.saveForm,
        method: "post",
        data: {
          createdBy: 1,
          template: content.toString(),
          templateName: workspace,
        },
      });
      console.log(formSubmit, "kkkk");
    }
  };

  const handleEditField = (e, index, item) => {
    e.stopPropagation();
    setIsEdit(true);
    setSelectedItem({ index: index, item: item });
  };

  const handleUpdateObject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let formValues = Object.fromEntries(formData.entries());
    formValues = { ...formValues, ...selectedItem.item };
    const data = [...destinationItems];
    data[selectedItem.index] = {
      ...data[selectedItem.index],
      ...formValues,
    };
    setDestinationItems(data);
    setIsEdit(false);
  };

  const handleOptionChange = (e, optionIndex) => {
    const newOptions = [...selectedItem.item.options];
    newOptions[optionIndex] = { label: e.target.value };

    setSelectedItem((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        options: newOptions,
      },
    }));
    console.log(selectedItem, "kkkk");
  };

  const addOption = () => {
    setSelectedItem((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        options: [...prevState.item.options, { label: "" }],
      },
    }));
  };

  const removeOption = (index) => {
    setSelectedItem((prevState) => ({
      ...prevState,
      item: {
        ...prevState.item,
        options: prevState.item.options.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="creator-class">
      {isEdit && (
        <Modal open={isEdit} onCancel={() => setIsEdit(false)} footer={false}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            onSubmit={handleUpdateObject}
          >
            {Object.entries(selectedItem.item).map(([key, value]) => {
              if (key !== "options") {
                return (
                  <label
                    key={key}
                    style={{
                      display: key !== "type" ? "flex" : "none",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <strong>{key}:</strong>
                    <input
                      type="text"
                      name={key}
                      value={value}
                      style={{
                        padding: 7,
                        outline: "none",
                        borderRadius: "10px",
                        border: "2px solid grey",
                      }}
                      onChange={(e) => {
                        setSelectedItem((prevState) => ({
                          ...prevState,
                          item: {
                            ...prevState.item,
                            [e.target.name]: e.target.value,
                          },
                        }));
                      }}
                      required
                    />
                  </label>
                );
              } else {
                return (
                  <div key={key} name="option">
                    <p>Options:</p>
                    {value.map((option, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => handleOptionChange(e, index)}
                          name="label"
                          style={{
                            padding: 7,
                            outline: "none",
                            borderRadius: "10px",
                            border: "2px solid grey",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={addOption}>
                      Add Option
                    </button>
                  </div>
                );
              }
            })}
            <button type="submit" style={{ width: "fit-content" }}>
              Submit
            </button>
          </form>
        </Modal>
      )}
      <header>
        Creator Tool:
        <input
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
          placeholder="Enter the form title"
        />
      </header>
      <section className="creator-layout">
        <div className="items">{sourceItems.map(renderButton)}</div>
        <div className="workspace">
          <form
            className="destination"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, false)}
            onSubmit={handleSubmit}
            ref={workspaceRef}
          >
            <section
              style={{
                backgroundColor: "rgba(0, 0, 0, 8%)",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "10px",
              }}
            >
              <h3>{workspace}</h3>
              {destinationItems.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    handleEditField(e, index, item);
                  }}
                >
                  {renderFormElement(item)}
                </div>
              ))}
            </section>
          </form>
        </div>
      </section>
      <button type="button" onClick={handleGetContent}>
        Publish
      </button>
    </div>
  );
};
