import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosBase from "./dados"; // JSON fixo
import "./menu.css";

function Menu() {
  const [usuarios, setUsuarios] = useState(usuariosBase);
  const [pesquisa, setPesquisa] = useState("");
  const [editando, setEditando] = useState(null);
  const [adicionando, setAdicionando] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    dataNascimento: ""
  });

  const navigate = useNavigate();

  // Filtrar usuários pelo nome
  const usuariosFiltrados = usuarios.filter((u) =>
    u.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Editar
  const handleEditar = (usuario) => {
    setEditando(usuario.id);
    setAdicionando(false);
    setFormData(usuario);
  };

  // Adicionar
  const handleAdicionar = () => {
    setEditando(null);
    setAdicionando(true);
    setFormData({
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      dataNascimento: ""
    });
  };

  // Máscaras e atualização
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "telefone") {
      value = value.replace(/\D/g, "").slice(0, 11);
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }

    if (name === "dataNascimento") {
      value = value.replace(/\D/g, "").slice(0, 8);
      value = value.replace(/(\d{2})(\d)/, "$1/$2");
      value = value.replace(/(\d{2})(\d)/, "$1/$2");
    }

    setFormData({ ...formData, [name]: value });
  };

  // Validação
  const validarCampos = () => {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const cpfValido = formData.cpf.replace(/\D/g, "").length === 11;
    const telefoneValido = formData.telefone.replace(/\D/g, "").length >= 10;
    const dataValida = /^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNascimento);
    return (
      formData.nome.trim() !== "" &&
      emailValido &&
      cpfValido &&
      telefoneValido &&
      dataValida
    );
  };

  // Salvar edição
  const handleSalvarEdicao = () => {
    setUsuarios(
      usuarios.map((u) => (u.id === editando ? { ...formData, id: u.id } : u))
    );
    setEditando(null);
  };

  // Salvar novo
  const handleSalvarNovo = () => {
    const novoUsuario = {
      ...formData,
      id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1
    };
    setUsuarios([...usuarios, novoUsuario]);
    setAdicionando(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu - Lista de Usuários</h1>

      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          background: "#444",
          color: "#fff",
          padding: "8px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none"
        }}
      >
        ← Voltar
      </button>

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      {/* Botão Adicionar */}
      <button onClick={handleAdicionar} style={{ marginLeft: "20px" }}>
        Adicionar Pessoa
      </button>

      {/* Lista de usuários */}
      <ul>
        {usuariosFiltrados.map((usuario) => (
          <li key={usuario.id} style={{ marginBottom: "10px" }}>
            <strong>{usuario.nome}</strong> - {usuario.email}
            <button
              onClick={() => handleEditar(usuario)}
              style={{ marginLeft: "10px" }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {/* Formulário (editar ou adicionar) */}
      {(editando || adicionando) && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        >
          <h2>{adicionando ? "Adicionar Nova Pessoa" : "Editando Usuário"}</h2>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
          />
          <br />
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="CPF"
          />
          <br />
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          <br />
          <input
            type="text"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            placeholder="Data de Nascimento"
          />
          <br />
          {adicionando ? (
            <button onClick={handleSalvarNovo} disabled={!validarCampos()}>
              Salvar Novo
            </button>
          ) : (
            <button onClick={handleSalvarEdicao} disabled={!validarCampos()}>
              Salvar Edição
            </button>
          )}
          <button
            onClick={() => {
              setEditando(null);
              setAdicionando(false);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
