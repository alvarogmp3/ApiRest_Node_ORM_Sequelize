import * as s from "../../services/alvaroGarciaService.js";
export const listar = async (req, res) => { try { res.json(await s.getAll()); } catch (e) { res.status(500).json({error: e.message}); } };
export const obtener = async (req, res) => { try { res.json(await s.getById(req.params.id)); } catch (e) { res.status(500).json({error: e.message}); } };
export const crear = async (req, res) => { try { res.status(201).json(await s.create(req.body)); } catch (e) { res.status(500).json({error: e.message}); } };
export const actualizar = async (req, res) => { try { res.json(await s.update(req.params.id, req.body)); } catch (e) { res.status(500).json({error: e.message}); } };
export const eliminar = async (req, res) => { try { res.json(await s.remove(req.params.id)); } catch (e) { res.status(500).json({error: e.message}); } };