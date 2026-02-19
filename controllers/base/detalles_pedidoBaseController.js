import * as s from "../../services/detalles_pedidoService.js";
export const listar = async (req, res) => { try { res.json(await s.getAll()); } catch (e) { res.status(500).json({error: e.message}); } };
export const obtener = async (req, res) => { try { const r = await s.getById(req.params.id); r ? res.json(r) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };
export const crear = async (req, res) => { 
    try { 
        if (!req.body || Object.keys(req.body).length === 0) return res.status(400).json({error: "Cuerpo vacío o método incorrecto"});
        res.status(201).json(await s.create(req.body)); 
    } catch (e) { res.status(500).json({error: e.message}); } 
};
export const actualizar = async (req, res) => { try { const r = await s.update(req.params.id, req.body); r ? res.json(r) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };
export const eliminar = async (req, res) => { try { const r = await s.remove(req.params.id); r ? res.json({success: true}) : res.status(404).json({error: "No encontrado"}); } catch (e) { res.status(500).json({error: e.message}); } };