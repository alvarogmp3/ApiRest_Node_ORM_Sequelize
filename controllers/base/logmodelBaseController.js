import * as Service from "../../services/logmodelService.js";
export const listar = async (req, res) => res.json(await Service.getAll());
export const obtener = async (req, res) => res.json(await Service.getById(req.params.id));
export const crear = async (req, res) => res.status(201).json(await Service.create(req.body));
export const actualizar = async (req, res) => res.json(await Service.update(req.params.id, req.body));
export const eliminar = async (req, res) => res.json(await Service.remove(req.params.id));