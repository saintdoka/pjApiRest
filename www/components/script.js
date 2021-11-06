// This is a JavaScript file

window.onload = function (){
  const buscar = document.querySelector('#buscar');
  const cadastrar= document.querySelector('#cadastrar');
  const alterar= document.querySelector('#alterar');
  const deletar= document.querySelector('#deletar');

  const id = document.querySelector('#id');
  const nome = document.querySelector('#nome');
  const curso = document.querySelector('#curso');



// metodo de busca
  buscar.addEventListener('click',function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method :"GET",
      mode:'cors',
      cache:'default'
    }).then(response=>{
      response.json().then(data =>{
        nome.value = data['nome'];
        curso.value = data['curso'];
      });
    });
  });
//  <--/ metodo de busca -->

  cadastrar.addEventListener('click',function(){
    let formdata = new FormData();
    formdata.append('nome',`${nome.valueS}`);
    formdata.append('curso',`${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
      body: formdata,
      method:"POST",
      mode:'cors',
      cache:'default'
    }).then(()=>{
      alert("Registro efetuado com Sucesso");
      limparCampo();
    });

  });

  alterar.addEventListener('click',function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method :"PUT",
      mode:'cors',
      cache:'default',
      headers:{
        'Content-type':'application/json; charset= UTF-8'
      },
      body:JSON.stringify({
        'nome':`${nome.value}`,
        'curso' : `${curso.value}`
      })
    }).then(()=>{
      alert("Registro Alterado com Sucesso");
      limparCampo();
    });
  });

  deletar.addEventListener('click',function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method :"DELETE",
      mode:'cors',
      cache:'default'
    }).then(()=>{
      alert("Registro Alterado com Sucesso!");
      limparCampo();
    });

    
  });

  // funções
  function limparCampo(){
    nome.value = "";
    curso.value = "";
    id.value = "";

  }
}