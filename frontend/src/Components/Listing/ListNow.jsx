import { useCallback, useState } from "react";
import CustomInput from "./comps/CustomInput";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStatus from "../../hooks/useStatus";
import { Loader2 } from "lucide-react";
import { ToggleSwitch } from "flowbite-react";
import { LISTINGS } from "../../store/LISTINGS_STORE/listingActions";
import { useSelector } from "react-redux";
import { MY_LISTINGS } from "../../store/MYLISTINGS_STORE/myListingsActions";

export default function listNow() {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.userData);

  const { isLoading, setLoading, setIdle } = useStatus();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [primaryRole, setPrimaryRole] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [skills, setSkills] = useState("");

  // State for salary, equity, and partnership
  const [payType, setPayType] = useState("");
  const [minStipend, setMinStipend] = useState("");
  const [maxStipend, setMaxStipend] = useState("");
  const [minEquity, setMinEquity] = useState("");
  const [maxEquity, setMaxEquity] = useState("");
  const [minPartnership, setMinPartnership] = useState("");
  const [maxPartnership, setMaxPartnership] = useState("");

  // State for recruiting contact
  const [recruitingEmail, setRecruitingEmail] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [easyApply, setEasyApply] = useState(false);

  const postionOptions = [
    { name: "Partnership", value: "Partnership" },
    { name: "Project", value: "Project" },
    { name: "Internship", value: "Internship" },
  ];

  const categories = [
    { name: "ML", value: "ML" },
    { name: "Design", value: "Design" },
    { name: "Marketing", value: "Marketing" },
    { name: "Finance", value: "finance" },
    { name: "Technology", value: "Technology" },
    { name: "Engineering", value: "Engineering" },
    { name: "Business", value: "Business" },
    { name: "Human resource", value: "Human resource" },
  ];

  const payTypeOptions = [
    { name: "Stipend", value: "Stipend" },
    { name: "Equity", value: "Equity" },
    { name: "Partnership", value: "Partnership" },
  ];

  function salarySection(name) {
    let setMinFunction, setMaxFunction, minValue, maxValue;

    switch (name) {
      case "Stipend":
        minValue = minStipend;
        maxValue = maxStipend;
        setMinFunction = setMinStipend;
        setMaxFunction = setMaxStipend;

      case "Equity":
        minValue = minEquity;
        maxValue = maxEquity;
        setMinFunction = setMinEquity;
        setMaxFunction = setMaxEquity;

      case "Partnership":
        minValue = minPartnership;
        maxValue = maxPartnership;
        setMinFunction = setMinPartnership;
        setMaxFunction = setMaxPartnership;
    }
    return (
      <div className="flex flex-col gap-1">
        <span className="font-bold">{name}*</span>
        <div className="flex w-full justify-evenly gap-5 flex-col md:flex-row">
          <CustomInput
            title={""}
            type={"input"}
            inputType={"number"}
            placeholder={`Select minimum ${name}`}
            inputSetter={setMinFunction}
          />
          <CustomInput
            title={""}
            type={"input"}
            inputType={"number"}
            placeholder={`Select maximum ${name}`}
            inputSetter={setMaxFunction}
          />
        </div>
      </div>
    );
  }

  const handleSubmit = useCallback(async () => {
    const newList = {
      title,
      description,
      position,
      primaryRole,
      workExperience,
      skills,
      payType,
      createdBy,
      createdAt: Date.now(),
      userId: email,
      applicants: [],
      methods: {
        link: applyLink,
        email: recruitingEmail,
        whatsapp,
        easy_apply: easyApply,
      },
      stipend: {
        min: minStipend,
        max: maxStipend,
      },
      equity: {
        min: minEquity,
        max: maxEquity,
      },
      parternship: {
        min: minPartnership,
        max: maxPartnership,
      },
    };

    try {
      if (
        !primaryRole ||
        !position ||
        !workExperience ||
        !payType ||
        !createdBy ||
        !title
      ) {
        toast("Please fill all the required fields");
        return;
      }

      if (
        !(recruitingEmail || recruitingEmail.length != 0) &&
        !(applyLink || applyLink != 0) &&
        !easyApply
      ) {
        toast("Please fill atleast one way to apply");
        return;
      }

      MY_LISTINGS.uploadListing(newList);

      navigate("/mylisting");
    } catch (error) {
      toast("Error creating list");
      console.log({ ...error });
    }
  }, [
    title,
    description,
    position,
    primaryRole,
    workExperience,
    skills,
    payType,
    minStipend,
    maxStipend,
    minEquity,
    maxEquity,
    minPartnership,
    maxPartnership,
    recruitingEmail,
    createdBy,
    whatsapp,
    applyLink,
    easyApply,
  ]);

  return (
    <div className="flex justify-center items-center lg:pt-20 bg-slate-100">
      <div className="lg:w-2/3 border lg:px-20 py-10 flex flex-col gap-10 w-full px-2 bg-white">
        <div className="flex flex-col justify-between items-stretch w-100 gap-3 ">
          <div className="w-100 text-center text-2xl font-bold">
            Opportunity details
          </div>
          <CustomInput
            title={"Title"}
            type={"input"}
            placeholder={"e.g Software Engineer , Product Designer , etc"}
            value={title}
            inputSetter={setTitle}
            mandotary={true}
            inputType={"text"}
          />

          <CustomInput
            title={"Description"}
            type={"textArea"}
            placeholder={"Describe the responsiblities of the position ."}
            inputType={"text"}
            value={description}
            inputSetter={setDescription}
          />

          <CustomInput
            title={"Type of Position"}
            type={"select"}
            options={postionOptions}
            mandotary={true}
            placeholder={"Select the type of position"}
            inputSetter={setPosition}
          />

          <CustomInput
            title={"Primary role"}
            type={"select"}
            options={categories}
            mandotary={true}
            placeholder={"Select role"}
            inputSetter={setPrimaryRole}
          />

          <CustomInput
            title={"Work experience"}
            type={"input"}
            inputType={"number"}
            mandotary={true}
            placeholder={"Enter minimum work experience"}
            value={workExperience}
            inputSetter={setWorkExperience}
          />

          <CustomInput
            title={"Skills"}
            type={"input"}
            inputType={"text"}
            placeholder={"React , Node , etc"}
            value={skills}
            inputSetter={setSkills}
          />
        </div>

        <div className="flex flex-col justify-between items-stretch w-100 gap-3 ">
          <div className="w-100 text-center text-2xl font-bold ">
            Salary , Equity and Partnership{" "}
          </div>

          <CustomInput
            title={"Pay type"}
            type={"select"}
            options={payTypeOptions}
            placeholder={"Select Pay type"}
            mandotary={true}
            inputSetter={setPayType}
          />

          {payType ? salarySection(payType) : ""}
        </div>

        <div className="flex flex-col justify-between items-stretch w-100 gap-3 ">
          <div className="w-100 text-center text-2xl font-bold ">
            Recruiting Contact
          </div>
          <CustomInput
            title={"Your Identity"}
            type={"input"}
            inputType={"text"}
            placeholder={"Add your name or your company name"}
            mandotary={true}
            value={createdBy}
            inputSetter={setCreatedBy}
          />
          <CustomInput
            title={"Email"}
            type={"input"}
            inputType={"email"}
            placeholder={"Add your email"}
            mandotary={true}
            value={recruitingEmail}
            inputSetter={setRecruitingEmail}
          />
          <CustomInput
            title={"Whatsapp number"}
            type={"input"}
            inputType={"number"}
            placeholder={"Add your number"}
            value={whatsapp}
            inputSetter={setWhatsapp}
          />
          <CustomInput
            title={"Apply Link"}
            type={"input"}
            inputType={"text"}
            placeholder={"enter a direct apply URL"}
            value={applyLink}
            inputSetter={setApplyLink}
          />
          <ToggleSwitch
            label="Easy Apply"
            onChange={setEasyApply}
            checked={easyApply}
            className="mt-4"
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <Button
            className="bg-[#a573bd] text-lg font-bold hover:w-full hover:bg-[#a573bd] rounded-3xl w-3/4 transition-all ease-out hover:rounded-lg hover:shadow-xl"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "list"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
