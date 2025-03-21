import React, { useRef, useState, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Draw = () => {
  const canvasRef = useRef(null);
  const [drawingName, setDrawingName] = useState("");
  const [savedDrawings, setSavedDrawings] = useState({});

  useEffect(() => {
    const storedDrawings = JSON.parse(localStorage.getItem("drawings")) || {};
    setSavedDrawings(storedDrawings);
  }, []);

  const handleSave = async () => {
    if (!drawingName.trim()) {
      // alert("Please enter a name for your drawing!");
      return;
    }

    const paths = await canvasRef.current.exportPaths();
    const newDrawings = { ...savedDrawings, [drawingName]: paths };

    setSavedDrawings(newDrawings);
    localStorage.setItem("drawings", JSON.stringify(newDrawings));
    // alert(`Drawing "${drawingName}" saved!`);
  };

  const handleLoad = (name) => {
    if (canvasRef.current && savedDrawings[name]) {
      canvasRef.current.resetCanvas();
      canvasRef.current.loadPaths(savedDrawings[name]);

      setDrawingName(name);
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setDrawingName("");
    }
  };

  const handleDelete = (name) => {
      const updatedDrawings = { ...savedDrawings };
      delete updatedDrawings[name];

      setSavedDrawings(updatedDrawings);
      localStorage.setItem("drawings", JSON.stringify(updatedDrawings));

      if (drawingName === name) {
        setDrawingName("");
        canvasRef.current.clearCanvas();
      }

  };

  return (
    <div className="container mt-4">
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter drawing name"
          value={drawingName}
          onChange={(e) => setDrawingName(e.target.value)}
        />
        <button className="btn btn-outline-primary"  style={{marginLeft:'20px'}} onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-outline-danger"  style={{marginLeft:'20px'}} onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="canvas-container mt-4">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={4}
          strokeColor="black"
          width="3000px"
          height="2000px"
          className="canvas"
        />
      </div>

      <ul className="list-group">
        {Object.keys(savedDrawings).map((name) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={name}>
            <span>{name}</span>
            <div>
              <button className="btn btn-outline-success" onClick={() => handleLoad(name)}>
                Load
              </button>
              <button className="btn btn-outline-warning" style={{marginLeft:'20px'}} onClick={() => handleDelete(name)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Draw;
