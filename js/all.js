document.getElementById("send").addEventListener("click", function(event) {
    if (validateForm()){
        event.preventDefault();
        document.querySelector("form").style.display = "none";
        document.querySelector("h3").innerText = "您的表單已成功提交，我們將盡快回復您";

        var radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
        var type;
        var company;
    
        radioButtons.forEach(function(radioButton) {
            if (radioButton.checked) {
                type = radioButton.value;
            }
        });
        console.log(type);
        switch(type){
            case 'EX0001':
                company = 'ST0101';
                break;
            case 'EX0002':
                company = 'ST0102';
                break;
            case 'EX0003':
                company = 'ST0103';
                break;
        }
        console.log(company);
        var name = document.getElementById("input-name").value;
        var id = document.getElementById("input-id").value;
        var phone = document.getElementById("input-phone").value;
        var email = document.getElementById("input-email").value;
        var content = document.getElementById("input-content").value;

        var data = JSON.stringify({
            // "fid":type,  有設定表單編號時請改用"fdisplay": type,
            "fdisplay": type,
            "apikey":"sW3sXc9jUfDhKmJ2",
            "fowner":"sysadmin",
            "name":name,
            "id":id,
            "phone":phone,
            "email":email,
            "content":content,
            "group":company
        });

        fetch('https://kevinapog.101eip.net/formsflow/start.php', {
            method: 'POST',
            // cors錯誤請增加此行程式碼
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            },
            body: data,
        })
        .then(response => {
            // 增加response判斷
            if (response.ok || response.status == 0 && response.type == 'opaque') {
                console.log(response);
                console.log('表單數據已成功提交');
            } else {
                console.error('表單數據提交失敗');
            }
        })
        .catch(error => {
            console.error('出現錯誤：', error);
        });
    }
});

function validateForm() {
var requiredFields = document.querySelectorAll('input[required], textarea[required]');
var isValid = true;
for (var i = 0; i < requiredFields.length; i++) {
  var field = requiredFields[i];
  if (!field.value.trim()) {
    isValid = false;
    alert("請填寫所有必填欄位");
    return;
  }
}
return isValid;
}