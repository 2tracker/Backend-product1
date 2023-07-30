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