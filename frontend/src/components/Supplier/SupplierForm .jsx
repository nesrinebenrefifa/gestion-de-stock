import { useState, useEffect } from "react";
import axios from "axios";
import Home from "../Tableau-de-bord/Home";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentSupplierId, setCurrentSupplierId] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/suppliers");
      setSuppliers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSupplier = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/suppliers/add",
          form
        );
        setSuppliers([...suppliers, response.data]);
        alert("Fournisseur ajouté avec succès");
        resetForm();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateSupplier = async () => {
    if (validateForm()) {
      try {
        const response = await axios.put(
          `http://localhost:5000/suppliers/edit/${currentSupplierId}`,
          form
        );
        setSuppliers(
          suppliers.map((supplier) =>
            supplier._id === currentSupplierId ? response.data : supplier
          )
        );
        alert("Fournisseur mis à jour avec succès");
        resetForm();
        setEditMode(false);
        setCurrentSupplierId(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/suppliers/delete/${id}`);

      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
      alert("Fournisseur supprimé avec succès");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSupplier = (supplier) => {
    setEditMode(true);
    setCurrentSupplierId(supplier._id);
    setForm({
      firstName: supplier.firstName,
      lastName: supplier.lastName,
      email: supplier.email,
      phone: supplier.phone,
    });
  };

  const handleChange = (e) => {
  
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    return (
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== ""
    );
  };

  const resetForm = () => {
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
  };

  return (
    <div>
      <Home />
      <div style={{ marginLeft: "287px", padding: "20px", flex: 1 }}>
        <h2>Gestion des Fournisseurs</h2>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Prénom"
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Nom"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Numéro de Téléphone"
          />
              </div>
          {editMode ? (
            <button onClick={handleUpdateSupplier} disabled={!validateForm()}>
              Mettre à jour le fournisseur
            </button>
          ) : (
            <button onClick={handleAddSupplier} disabled={!validateForm()}>
              Ajouter Fournisseur
            </button>
          )}
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Numéro de Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.firstName}</td>
                <td>{supplier.lastName}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>
                  <i
                    className="fas fa-edit"
                    onClick={() => handleEditSupplier(supplier)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  ></i>
                  <i
                    className="fas fa-trash"
                    onClick={() => handleDeleteSupplier(supplier._id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierManagement;
