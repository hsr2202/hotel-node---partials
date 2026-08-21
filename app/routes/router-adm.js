const express = require("express");
const router = express.Router();
 
const { body, validationResult } = require("express-validator")
 
router.get("/", (req, res)=>{
    res.render("pages/index-adm");
})
 
router.get("/adm-cliente", (req, res)=>{
    res.render("pages/adm-cliente");
})
 
//alterado o render
router.get("/adm-cliente-novo", (req, res) => {
   res.render("pages/adm-cliente-novo", {
      erros: null,
      valores: {
         nome: "",
         cep: "",
         usuario: "",
         email: "",
         senha: "",
         tipoUsuario: "",
         status: ""
      }
   });
});
 
 
//validação
router.post(
   "/adm-cliente-novo",
 
   body("nome")
      .isLength({ min: 3, max: 50 })
      .withMessage("O nome deve ter entre 3 e 50 caracteres."),
 
   body("cep")
      .matches(/^\d{5}-?\d{3}$/)
      .withMessage("Digite um CEP válido. Exemplo: 00000-000."),
 
   body("nomeUsuario")
      .isLength({ min: 3, max: 20 })
      .withMessage("O nome de usuário deve ter entre 3 e 20 caracteres."),
 
   body("email")
      .isEmail()
      .withMessage("Digite um e-mail válido."),
 
   body("senha")
      .isLength({ min: 6 })
      .withMessage("A senha deve ter no mínimo 6 caracteres."),
 
   body("tipo")
      .isIn(["1", "2"])
      .withMessage("O tipo de usuário deve ser comum ou gerente."),
 
   body("status")
      .notEmpty()
      .isIn(["1", "0"])
      .withMessage("O status deve ser ativo ou inativo."),
 
   (req, res) => {
 
      const erros = validationResult(req);
 
      if (!erros.isEmpty()) {
         return res.render("pages/adm-cliente-novo", {
            erros: erros,
            valores: req.body
         });
      }
 
      return res.render("pages/adm-cliente-novo", {
         erros: null,
         valores: req.body
      });
   }
);
 
router.get("/adm-cliente-edit", (req, res)=>{
    res.render("pages/adm-cliente-edit");
})
 
router.get("/adm-cliente-list", (req, res)=>{
    res.render("pages/adm-cliente-list");
})
 
router.get("/adm-cliente-del", (req, res)=>{
    res.render("pages/adm-cliente-del");
})
module.exports = router;






module.exports = router;