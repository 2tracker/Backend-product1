exports.birthDay = (user,formattedBirthday) => `
<td class="esd-stripe" align="center">
<table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
<tbody>
    <tr>
        <td class="esd-structure" align="left" style="background-position: center top; background-color: #202447;" bgcolor="#202447" esd-custom-block-id="54591">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td width="600" class="esd-container-frame esd-checked" align="center" valign="top">
                            <table cellpadding="0" cellspacing="0" width="100%" style="background-image:url(https://tlr.stripocdn.email/content/guids/CABINET_58bdfab47b91421ec71c0b7efc174ad6/images/3021564570245556.gif);background-position: left top; background-repeat: no-repeat;" background="https://tlr.stripocdn.email/content/guids/CABINET_58bdfab47b91421ec71c0b7efc174ad6/images/3021564570245556.gif">
                                <tbody>
                                    <tr>
                                        <td align="center" class="esd-block-spacer es-p20" style="font-size: 0px;">
                                            <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-text">
                                            <h1 style="color: #ffffff;">Happy Birthday</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-spacer es-p20" style="font-size: 0px;">
                                            <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="border-bottom: 1px solid #cccccc; background:none; height:1px; width:100%; margin:0px 0px 0px 0px;"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td class="esd-structure es-p20t es-p10b es-p20r es-p20l" align="left" esd-custom-block-id="54592">
            <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td width="560" class="esd-container-frame" align="center" valign="top">
                            <table cellpadding="0" cellspacing="0" width="100%" style="background-position: left top;">
                                <tbody>
                                    <tr class="es-visible-simple-html-only">
                                        <td align="center" class="esd-block-text es-p10b es-m-txt-c">
                                            <h2 style="color: #33587c;">A wish for you on your birthday, whatever you ask may you receive, whatever you seek may you find, whatever you wish may it be fulfilled on your birthday and always</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-image" style="font-size: 0px;"><a target="_blank" href="https://img.freepik.com/free-vector/colorful-birthday-composition-with-lovely-style_23-2147831067.jpg?w=2000"><img src="https://img.freepik.com/free-vector/colorful-birthday-composition-with-lovely-style_23-2147831067.jpg?w=2000" alt style="display: block;" width="200"></a></td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-text es-m-txt-c">
                                            <h3>${user.firstName} ${user.lastName}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-text es-p5b">
                                            <p style="color: #999999;"><strong>${user.role}</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-text es-p10b es-m-txt-l">
                                            <p>Everyone let's congratulate ${user.firstName} ${user.lastName} at ${formattedBirthday}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" class="esd-block-button es-p10t es-p15b es-p10r es-p10l"><span class="es-button-border" style="background: #38c2f1;"><a href="https://viewstripo.email" class="es-button" target="_blank" style="padding: 10px 30px;">Yes, I will make it</a></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>
</tbody>
</table>
</td>
`;

exports.SendOTP = (otp) => `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">HMN Infotech</a>
  </div>
  <p style="font-size:1.1em">Hi,</p>
  <p>Thank you for choosing HMN Infotech. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: ##87CEEB;border-radius: 4px;">${otp}</h2>
  <p style="font-size:0.9em;">Regards,<br />HMN Infotech</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>HMN Infotech</p>
    <p>1600 Amphitheatre Parkway</p>
    <p>Surat</p>
  </div>
</div>
</div>`;

exports.UserWelcome = () => `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title></title></head><body><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-email-paddings" valign="top"><table class="es-content" cellspacing="0" cellpadding="0" align="center">
            <tbody><tr>
                <td class="esd-stripe" align="center" bgcolor="transparent">
                    <table class="es-content-body" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" align="center">
                      
          <tbody><tr>
            <td class="esd-structure es-p20t es-p20r es-p20l" align="left">
              <table cellpadding="0" cellspacing="0">
              
              <tbody><tr>
                      
                  <td width="560" class="esd-container-frame" align="left">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                          <tbody><tr>
            <td align="center" class="esd-block-image" style="font-size: 0">
                <a target="_blank">
                    <img class="adapt-img" src="https://xtocgg.stripocdn.email/content/guids/CABINET_da9b8524aeac04db0fa9a2577a47496edc41bebb8af22e335ebc2c13fcc5bd89/images/logo_2.png" alt="" width="95">
                </a>
            </td>
        </tr><tr>
            <td align="center" class="esd-block-text">
                <p><strong style="font-family:arial,&#39;helvetica neue&#39;,helvetica,sans-serif;font-size:16px !important;line-height:160% !important">TIME TO TASK</strong></p>
            </td>
        </tr></tbody></table>
                  </td>
              
                      
              </tr>
          
            </tbody></table>
            </td>
          </tr>
        
                    </tbody></table>
                </td>
            </tr>
          </tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="es-p20r es-p20l esd-structure" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-container-frame" width="560" valign="top" align="center"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>
            <td align="center" class="esd-block-image" style="font-size: 0">
                <a target="_blank">
                    <img class="adapt-img" src="https://xtocgg.stripocdn.email/content/guids/CABINET_da9b8524aeac04db0fa9a2577a47496edc41bebb8af22e335ebc2c13fcc5bd89/images/4989777.jpg" alt="" width="465">
                </a>
            </td>
        </tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="es-content" cellspacing="0" cellpadding="0" align="center">
            <tbody><tr>
                <td class="esd-stripe" align="center" bgcolor="transparent">
                    <table class="es-content-body" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" align="center">
                      
          <tbody><tr>
            <td class="esd-structure es-p20r es-p20l es-p20b" align="left">
              <table cellpadding="0" cellspacing="0">
              
              <tbody><tr>
                      
                  <td width="560" class="esd-container-frame" align="left">
                      <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                          <tbody><tr>
            <td align="center" class="esd-block-text">
                <h1><strong style="font-family:verdana,geneva,sans-serif;font-size:36px !important">Mitul Beladiya</strong></h1>
            </td>
        </tr><tr>
            <td align="center" class="esd-block-text es-p10t">
                <h3><strong style="font-family:arial,&#39;helvetica neue&#39;,helvetica,sans-serif;font-size:22px !important">Fullstack devloper</strong></h3>
            </td>
        </tr><tr>
            <td align="center" class="esd-block-text es-p20t">
                <p style="color:#000000;font-size:18px !important"><span style="font-family:tahoma,verdana,segoe,sans-serif">Welcome to Time & Task prv. Ltd and new journy start with us</span></p><p style="color:#000000;font-size:18px !important"><span style="font-family:tahoma,verdana,segoe,sans-serif">i hope you are happy to join this company Best Of Luck </span></p>
            </td>
        </tr></tbody></table>
                  </td>
              
                      
              </tr>
          
            </tbody></table>
            </td>
          </tr>
        
                    </tbody></table>
                </td>
            </tr>
          </tbody></table></td></tr></tbody></table></body></html>

`