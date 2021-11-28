// This is a JavaScript file

window.onload = function (){
  const buscar = document.querySelector('#buscar');
  const buscarQR = document.querySelector("#buscarqr");
  const cadastrar= document.querySelector('#cadastrar');
  const alterar= document.querySelector('#alterar');
  const deletar= document.querySelector('#deletar');
  
  const id = document.querySelector('#id');
  const nome = document.querySelector('#nome');
  const curso = document.querySelector('#curso');

  const opcoes = {
    method:'GET',
    mode:'cors',
    cache: 'default'
  }

function checkConnection() {
    let networkState = navigator.connection.type;

    let states = {};

    states[Connection.NONE] = 0;

    if(states[networkState] == 0){
      return false;
    }else{
      return true;
    }
}

// checkConnection();

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){
    navigator.app.exitApp();
  }else{
    return false;
  }
}

// metodo de busca
  buscar.addEventListener('click',function(){
    if(checkConnection()){
      fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${ result.text }`,opcoes)
        .then(response =>{response.json().then(data =>{
          nome.value = data['nome'];
          curso.value = data['curso'];
        })
      })
    }else{    
      navigator.notification.confirm(
          'Você não tem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
      );
    } 
  });

  buscarQR.addEventListener('click',function(){
    if(checkConnection()){
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${ result.text }`,opcoes)
          .then(response =>{response.json().then(data =>{
              nome.value = data['nome'];
              curso.value = data['curso'];
            })
          })
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : false, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        saveHistory: false, // Android, save scan history (default false)
        prompt : "Area de Scan", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: true // iOS and Android
      }
      );
    }else{
      navigator.notification.confirm(
          'Você não tem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
      );
    }
  });

//  <--/ metodo de busca -->

  cadastrar.addEventListener('click',function(){
    if(checkConnection()){
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
    }else{    
        navigator.notification.confirm(
          'Você não tem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
        );
      } 
  });

  alterar.addEventListener('click',function(){
     if(checkConnection()){
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
    }else{    
        navigator.notification.confirm(
          'Você não tem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
        );
      } 
  });

  deletar.addEventListener('click',function(){
    if(checkConnection()){
      fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
        method :"DELETE",
        mode:'cors',
        cache:'default'
      }).then(()=>{
        alert("Registro Alterado com Sucesso!");
        limparCampo();
      });
    }else{    
        navigator.notification.confirm(
          'Você não tem conexão! Deseja Sair?', // message
          onConfirm,            // callback to invoke with index of button pressed
          'Erro de conexão',           // title
          ['SIM','NÃO']     // buttonLabels
        );
      } 
    
  });

  // funções
  function limparCampo(){
    nome.value = "";
    curso.value = "";

  }
}