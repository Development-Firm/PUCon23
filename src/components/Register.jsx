import React, { useEffect } from "react";
import Navbar from "./Navbar";
import {
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Steps,
  theme,
  Upload,
} from "antd";
import { useState } from "react";
import { styles } from "../styles";
import ImgCrop from "antd-img-crop";
import { StarsCanvas } from "./canvas";
import { db, storage } from "../firebase";
import {
  updateDoc,
  doc,
  where,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { LessEqualStencilFunc } from "three";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import sendPendingEmail from "../utils/pendingEmail";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import Compressor from "compressorjs";

const registrationsCollectionRef = collection(db, "registrations");

const { Option } = Select;
function getNumberArray(count) {
  const numberArray = [];

  for (let i = 1; i <= count; i++) {
    numberArray.push(i);
  }

  return numberArray;
}

const competitionInfo = {
  "Competitive Programming": {
    cap: 100,
    fee: 1200,
    maxTeamCount: 3,
  },
  "Web Development Hackathon": {
    cap: 40,
    fee: 1500,
    maxTeamCount: 3,
  },
  "Mobile Development Hackathon": {
    cap: 20,
    fee: 1500,
    maxTeamCount: 3,
  },
  "Artificial Intellegence": {
    cap: 30,
    fee: 1500,
    maxTeamCount: 3,
  },
  "Game Design": {
    cap: 20,
    fee: 1200,
    maxTeamCount: 3,
  },
  "pwn CTF": {
    cap: 40,
    fee: 1200,
    maxTeamCount: 3,
  },
  "Esports FIFA": {
    cap: 70,
    fee: 500,
    maxTeamCount: 1,
  },
  "Esports TEKKEN": {
    cap: 70,
    fee: 500,
    maxTeamCount: 1,
  },
};

const Form1 = ({ form, setlimitReach, limitReach }) => {
  const messagesRef = collection(db, "registrations");
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    setlimitReach(null);
    const queryMessages = query(
      messagesRef,
      where("competition", "==", competition),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let applicants = 0;
      snapshot.forEach((doc) => {
        applicants++;
      });

      setlimitReach(applicants >= competitionInfo[competition]?.cap);
    });

    return () => unsuscribe();
  }, [competition]);

  const onFinish = (values) => {};
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <div className="form1sm mt-[100px] mb-20 ">
        <Form
          form={form}
          layout={"vertical"}
          // name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Form.Item
            name="competition"
            label="Competition"
            rules={[
              {
                required: true,
                message: "Please select competition type!",
              },
            ]}
          >
            <Select
              placeholder="Select competition"
              allowClear
              size="large"
              onChange={(value) => setCompetition(value)}
            >
              {Object.keys(competitionInfo).map((e) => (
                <Option value={e} key={e}>
                  {e}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
      {!competition && (
        <p className="text-secondary text-[17px] max-w-5xl leading-[30px]"></p>
      )}
      {limitReach && (
        <p className="text-secondary registration-text-secondary text-[17px] max-w-5xl leading-[30px]">
          <span className="font-bold" style={{ color: "red" }}>
            Registration limit for this competiion has reached!
          </span>
        </p>
      )}
      {!limitReach && competition && (
        <p className="text-secondary registration-text-secondary text-[17px] max-w-5xl leading-[30px]">
          Registertion Fee:{" "}
          <span className="font-bold">
            Rs. {competitionInfo[competition]?.fee}
          </span>{" "}
          per team
        </p>
      )}
    </>
  );
};

const Form2 = ({ form, competition }) => {
  const [validityStatus, setValidityStatus] = useState({
    status: "success",
    message: "",
  });
  const onFinish = (values) => {};
  const validateTeamCount = (e) => {
    const num = e.target.value;
    if (num == "") {
      setValidityStatus({
        status: "error",
        message: "Enter the count of team members",
      });
      return;
    }
    if (num <= competitionInfo[competition]?.maxTeamCount && num > 0)
      setValidityStatus({ status: "success", message: "" });
    else
      setValidityStatus({
        status: "error",
        message: `Members can be upto ${competitionInfo[competition].maxTeamCount}`,
      });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="form2sm mt-[100px] mb-20 ">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Form.Item
          name="team_name"
          label="Team Name"
          rules={[
            {
              required: true,
              message: "Please enter team name!",
              type: "string",
            },
          ]}
        >
          <Input placeholder="Enter your team name" size="large" />
        </Form.Item>

        <Form.Item
          name="team_members_count"
          label="No of team members"
          validateStatus={validityStatus.status}
          help={validityStatus.message}
          onChange={validateTeamCount}
          rules={[
            {
              required: true,
              message: "Please enter no of team members!",
            },
          ]}
        >
          <Input
            placeholder="Enter no of team members"
            size="large"
            type="number"
            max={competitionInfo[competition]?.maxTeamCount}
            min={1}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const Form3 = ({ form, membersCount }) => {
  let members = getNumberArray(membersCount);
  const onFinish = (values) => {};
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="form3sm mt-[100px] mb-20 ">
      <Form
        form={form}
        // name="control-hooks"
        layout="vertical"
        onFinish={onFinish}
        style={{}}
      >
        {members.map((el) => {
          return (
            <div key={el}>
              <h3 className="text-white font-bold text-center text-[22px]">
                Member {el}
              </h3>
              <hr className="border-[#874afe]  border-2 mb-10 w-[60px] mx-auto" />
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name={`member_${el}_name`}
                    label={`${
                      el === 1 ? `Team lead name` : `Member ${el} name`
                    }`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter name!",
                        type: "string",
                      },
                    ]}
                  >
                    <Input
                      placeholder={`${
                        el === 1 ? `Team lead name` : `Member ${el} name`
                      }`}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name={`member_${el}_email`}
                    label={`${
                      el === 1 ? `Team lead email` : `Member ${el} email`
                    }`}
                    rules={[
                      {
                        required: true,
                        type: "email",
                        validator: (_, value) => {
                          const stringValue = value?.toString() ?? "";
                          if (
                            !stringValue
                              .toLowerCase()
                              .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              )
                          ) {
                            return Promise.reject(
                              new Error("Enter a valid email")
                            );
                          }
                          // if (!stringValue.includes("@pucit.edu.pk")) {
                          //   return Promise.reject(
                          //     new Error("Apply with your university email")
                          //   );
                          // }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder={`rollno@pucit.edu.pk`} size="large" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name={`member_${el}_cnic`}
                    label={`${
                      el === 1 ? `Team lead CNIC` : `Member ${el} CNIC`
                    }`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid CNIC!",
                        type: "string",
                        validator: (_, value) => {
                          const stringValue = value?.toString() ?? "";
                          if (
                            stringValue.replace(/[^0-9]/g, "").length !== 13
                          ) {
                            return Promise.reject(
                              new Error("CNIC must have 13 digits")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <ReactInputMask mask="99999-9999999-9" maskChar=" ">
                      {() => (
                        <Input placeholder={`00000-0000000-0`} size="large" />
                      )}
                    </ReactInputMask>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name={`member_${el}_phone`}
                    label={`${
                      el === 1 ? `Team lead phone` : `Member ${el} phone`
                    }`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter valid phone no!",
                        type: "string",
                        validator: (_, value) => {
                          if (value && value.replace(/\s/g, "").length !== 11) {
                            return Promise.reject(
                              new Error("Phone number is incorrect")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <ReactInputMask mask="0399 9999999" maskChar=" ">
                      {() => (
                        <Input placeholder={`03** *******`} size="large" />
                      )}
                    </ReactInputMask>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          );
        })}
      </Form>
    </div>
  );
};

const Form4 = ({ form, fileList, setFileList, competition }) => {
  const [validityStatus, setValidityStatus] = useState({
    status: "success",
    message: "",
  });
  const onImgChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (values) => {};
  const onReset = () => {
    form.resetFields();
  };
  const validateAccomodationCount = (e) => {
    const num = e.target.value;
    if (num <= competitionInfo[competition]?.maxTeamCount && num >= 0)
      setValidityStatus({ status: "success", message: "" });
    else
      setValidityStatus({
        status: "error",
        message: `Members can be upto ${competitionInfo[competition].maxTeamCount}`,
      });
  };
  const team = {
    name: 'Team A',
    participants: 5,
    accommodations: 3,
    price: 100,
    discount: 20,
  };

  return (
    <div className="form4sm mt-[100px] mb-20">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="accomodation_count"
              label="No of accomodations"
              validateStatus={validityStatus.status}
              help={validityStatus.message}
              onChange={validateAccomodationCount}
            >
              <Input
                placeholder="Enter no of accomodations"
                size="large"
                type="number"
                max={competitionInfo[competition]?.maxTeamCount}
                min={0}
                defaultValue={0}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
          <Form.Item
          name="promo_code"
          label="Promo Code"
          rules={[
            {
              type: "string",
            },
          ]}
        >
          <Input placeholder="PU001" size="large" />
        </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="reg">
        <p className="text-white font-bold text-[22px] form4Text">Billing</p>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ backgroundColor: '#050816', color: 'white', border: '1px solid white', padding: 8 }}>
            Items
          </th>
          <th style={{ backgroundColor: '#050816', color: 'white', border: '1px solid white', padding: 8 }}>
            Quantity
          </th>
          <th style={{ backgroundColor: '#050816', color: 'white', border: '1px solid white', padding: 8 }}>
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>Registration</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>{competitionInfo[competition].fee+'x 1'}</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>{competitionInfo[competition].fee}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>Accomodation</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>{"600 x 2"}</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>{"1200"}</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}></td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>Discount</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>20%</td>
        </tr>
        <tr>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}></td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>Total</td>
          <td style={{ border: '1px solid white', padding: 8, color: 'white' }}>2000</td>
        </tr>
      </tbody>
    </table>
        {/* <p className="text-secondary text-[14px] leading-[30px] mb-5 form4Text">
          <ul className="form4Text">
            {
              <li>
                Registertion Fee:{" "}
                <span className="font-bold">Rs. {competitionInfo[competition]?.fee}</span>{" "}
                per team
              </li>
            }
          </ul>
        </p> */}

        {/*Add the table here!*/}
      </div>
      <div className="reg">
        <p className="text-white font-bold text-[22px] form4Text">Payment:</p>
        <p className="text-secondary text-[14px] leading-[30px] mb-5 form4Text">
          <ul className="form4Text">
            <li>
              Pay your dues on Jazzcash/ EasyPaisa / NayaPay / SadaPay / RaastID
              account no. 03057381431. Account name: Ali Raza
            </li>
            <li>Upload reciept below.</li>
          </ul>
        </p>
      </div>

      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onImgChange}
          onPreview={onPreview}
          beforeUpload={() => false}
        >
          {fileList.length < 1 && "+ Reciept image"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

const steps = [
  {
    title: "Competition",
    content: <Form1 />,
  },
  {
    title: "Team",
    content: <Form2 />,
  },
  {
    title: "Members Info",
    content: <Form3 />,
  },
  {
    title: "Payment",
    content: <Form4 />,
  },
];

const StepsForm = () => {
  const navigate = useNavigate();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [limitReach, setlimitReach] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const registrationStatusMessage = (e) => {
    if (!e)
      messageApi.open({
        type: "success",
        content: "Request sent successfully!",
        duration: 5,
      });
    else
      messageApi.open({
        type: "error",
        content: "Something went wrong, try again :)",
        duration: 5,
      });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    messageApi.open({
      type: "loading",
      content: "We are processing your request, Please wait...",
      duration: 0,
    });
    // const imageFile = fileList[0].originFileObj;
    // const imageRef = ref(storage,`images/${imageFile.name + Date.now()}`);
    // const snapshot= await uploadBytesResumable(imageRef, imageFile);
    // const imageUrl = await getDownloadURL(snapshot.ref);
    const imageFile = fileList[0].originFileObj;

    if (!/^image\//.test(imageFile.type)) {
      message.error("File is not an image");
      return;
    }

    let quality = 0.5; // default quality
    if (imageFile.size > 10 * 1024 * 1024) {
      // greater than 10 MB
      quality = 0.05;
    } else if (imageFile.size > 5 * 1024 * 1024) {
      // greater than 5 MB and less than or equal to 10 MB
      quality = 0.1;
    } else if (imageFile.size > 1 * 1024 * 1024) {
      // greater than 1 MB and less than or equal to 5 MB
      quality = 0.15;
    }

    const compressedImageFile = await new Promise((resolve, reject) => {
      new Compressor(imageFile, {
        quality,
        success: (result) => {
          resolve(result);
        },
        error: (error) => {
          reject(error);
        },
      });
    });

    const imageRef = ref(
      storage,
      `images/${compressedImageFile.name + Date.now()}`
    );
    const snapshot = await uploadBytesResumable(imageRef, compressedImageFile);
    const imageUrl = await getDownloadURL(snapshot.ref);

    const { team_name } = form2.getFieldsValue();
    const { member_1_email } = form3.getFieldsValue();

    try {
      setFileList([]);
      await addDoc(registrationsCollectionRef, {
        createdAt: serverTimestamp(),
        ...form1.getFieldsValue(),
        ...form2.getFieldsValue(),
        ...form3.getFieldsValue(),
        imageUrl,
        status: "pending",
      });
      messageApi.destroy();
      // registrationStatusMessage()
      sendPendingEmail(member_1_email, team_name);
      form1.resetFields();
      form2.resetFields();
      form3.resetFields();
      form4.resetFields();
      setTimeout(() => {
        setSubmitting(false);
        navigate("/");
      }, 5000);
    } catch (e) {
      setSubmitting(false);
      registrationStatusMessage(e);
    }
  };

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = async () => {
    if (current === 0) {
      let res = await form1.validateFields();
    } else if (current === 1) {
      let res = await form2.validateFields();
    } else if (current === 2) {
      let res = await form3.validateFields();
    } else if (current === 3) {
      let res = await form4.validateFields();
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    color: token.colorTextTertiary,
    marginTop: 16,
    minHeight: "200px",
  };
  return (
    <>
      {contextHolder}
      <div className="pt-[150px] max-w-6xl mx-auto">
        <h2 className={`${styles.sectionHeadText} text-center regText`}>
          Registration.
        </h2>
        <hr className="border-[#874afe] mt-0 border-4 mb-20 w-[120px] mx-auto" />
        <Steps current={current} items={items} />
        {/* <div style={contentStyle}>{steps[ current ].content}</div> */}
        <div
          className="form1Container"
          style={{ ...contentStyle, display: current === 0 ? "block" : "none" }}
        >
          <Form1
            form={form1}
            setlimitReach={setlimitReach}
            limitReach={limitReach}
          />
        </div>

        <div
          className="form2Container"
          style={{ ...contentStyle, display: current === 1 ? "block" : "none" }}
        >
          <Form2 form={form2} competition={form1.getFieldValue().competition} />
        </div>

        <div
          className="form3Container"
          style={{ ...contentStyle, display: current === 2 ? "block" : "none" }}
        >
          <Form3
            form={form3}
            membersCount={form2.getFieldValue().team_members_count}
            competition={form1.getFieldValue().competition}
          />
        </div>

        <div
          className="form4Container"
          style={{ ...contentStyle, display: current === 3 ? "block" : "none" }}
        >
          <Form4
            form={form4}
            fileList={fileList}
            setFileList={setFileList}
            competition={form1.getFieldValue().competition}
          />
        </div>

        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <button
              disabled={limitReach == null || limitReach}
              onClick={() => next()}
              className="nextFormBtn w-[80px] font-bold h-[40px] text-[18px] gradient_color hover:bg-[#6825f7] text-white"
            >
              Next
            </button>
          )}
          {current === steps.length - 1 && (
            <button
              disabled={!fileList.length}
              onClick={() => handleSubmit()}
              className={`submitFormBtn w-[90px] font-bold h-[40px] text-[18px] ${
                fileList.length
                  ? "gradient_color hover:bg-[#6825f7] text-white"
                  : "bg-[#6825f7] opacity-80 bg-gray-50 text-black"
              } `}
            >
              Submit
            </button>
          )}
          {current > 0 && (
            <button
              onClick={() => prev()}
              className="prevFormBtn w-[100px] ml-3 font-bold h-[40px] text-[18px] bg-[white] hover:bg-[#d2d0d0] text-black"
            >
              Previous
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const Register = () => {
  return (
    <div className="relative z-0 pb-10 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar isExternalLinks isRegisteration={true} />
      </div>

      {/* <Alert
        banner
        type='info'
        className='fixed'
        style={{zIndex:'999'}}
        message={
          <Marquee pauseOnHover gradient={false}>
            Registration for Code Bees from new campus is closed due to the
            upper limit. Special prizes for female teams in Web and Mobile
            Hackathons - top 10. Hurry!{' '}
          </Marquee>
        }
      /> */}

      <StepsForm />
      <StarsCanvas />
    </div>
  );
};

export default Register;
