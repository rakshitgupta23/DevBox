import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";
import { languageOptions } from "../constants/languageOptions";
import useKeyPress from "../hooks/useKeyPress";
import { defineTheme } from "../lib/defineTheme";
import LanguageDropdown from "../components/LanguageDropdown";
import ThemeDropdown from "../components/ThemeDropdown";
import OutputWindow from "../components/OutputWindow";
import CustomInput from "../components/CustomInput";
import OutputDetails from "../components/OutputDetails";
import { showErrorToast, showSuccessToast } from "../lib/toast";

interface theme {
  value: string;
  label: string;
  key?: string;
}

export interface LandingProps {
  code?: string;
  codeId?: string;
  title?: string;
  update?: boolean;
  description?: string;
  pairCode?:boolean;
  socketRef?:any;
  roomId?:string;
}

const starterCodeMap = {
  javascript: "// Write your code here\nconsole.log('Hello, World!');",
  python: "# Write your code here\nprint('Hello, World!')",
  java: "// Write your code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
  c: "// Write your code here\n#include <stdio.h>\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
  cpp: "// Write your code here\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}",
  assembly: "section .data\n    hello db 'Hello, World!',0  ; Declare a null-terminated string\n\nsection .text\n    global _start  ; Define the entry point\n\n_start:\n    ; Write the string to stdout (file descriptor 1)\n    mov eax, 4        ; syscall number for sys_write\n    mov ebx, 1        ; file descriptor 1 (stdout)\n    mov ecx, hello    ; pointer to the string\n    mov edx, 13       ; length of the string\n    int 0x80          ; interrupt to make the syscall\n\n    ; Exit the program\n    mov eax, 1        ; syscall number for sys_exit\n    xor ebx, ebx      ; exit status 0\n    int 0x80          ; interrupt to make the syscall",
  bash: "# Write your code here\necho 'Hello, World!'",
  basic: "' Write your code here\nPRINT \"Hello, World!\"",
  clojure: "; Write your code here\n(println \"Hello, World!\")",
  csharp: "// Write your code here\nusing System;\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World!\");\n    }\n}",
  cobol:  "IDENTIFICATION DIVISION.\nPROGRAM-ID. HelloWorld.\nPROCEDURE DIVISION.\n    DISPLAY 'Hello, World!'.\n    STOP RUN.",
  lisp: "; Write your code here\n(print \"Hello, World!\")",
  d: "// Write your code here\nimport std.stdio;\nvoid main() {\n    writeln(\"Hello, World!\");\n}",
  elixir: "IO.puts \"Hello, World!\"",
  erlang: "main(_) ->\n    io:fwrite(\"hello, world\\n\").",
  fsharp: "printfn \"Hello, World!\"",
  fortran: "! Write your code here\nprogram hello\n    print *, 'Hello, World!'\nend program hello",
  go: "// Write your code here\npackage main\nimport \"fmt\"\nfunc main() {\n    fmt.Println(\"Hello, World!\")\n}",
  groovy: "// Write your code here\nprintln 'Hello, World!'",
  haskell: "-- Write your code here\nmain = putStrLn \"Hello, World!\"",
  kotlin: "// Write your code here\nfun main() {\n    println(\"Hello, World!\")\n}",
  lua: "-- Write your code here\nprint('Hello, World!')",
  objectivec: "// Write your code here\n#import <stdio.h>\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
  ocaml: "(* Write your code here *)\nlet () = print_endline \"Hello, World!\"",
  octave: "% Write your code here\ndisp('Hello, World!')",
  pascal: "{ Write your code here }\nprogram Hello;\nbegin\n  writeln('Hello, World!');\nend.",
  perl: "# Write your code here\nprint \"Hello, World!\\n\";",
  php: "<?php\n// Write your code here\necho \"Hello, World!\";",
  prolog: "% Write your code here\n:- initialization(main).\nmain :- write('Hello, World!'), nl.",
  python2: "# Write your code here\nprint 'Hello, World!'",
  r: "# Write your code here\nprint('Hello, World!')",
  ruby: "# Write your code here\nputs 'Hello, World!'",
  rust: "// Write your code here\nfn main() {\n    println!(\"Hello, World!\");\n}",
  scala: "// Write your code here\nobject Main extends App { println(\"Hello, World!\") }",
  sql: "-- Write your code here\nSELECT 'Hello, World!';",
  swift: "// Write your code here\nprint(\"Hello, World!\")",
  typescript: "// Write your code here\nconsole.log('Hello, World!');",
  vbnet:  "Module Program\n    Sub Main()\n        Console.WriteLine(\"Hello, World!\")\n    End Sub\nEnd Module"
};



const Landing = (props: LandingProps) => {
  const { status, data } = useSession();
  const [code, setCode] = useState<string>(
    props.code ||starterCodeMap[languageOptions[0].value]|| "//Write your code here"
  );
  const [customInput, setCustomInput] = useState<string>("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [showSaveCode, setShowSaveCode] = useState<boolean>(false);
  const [codeTitle, setCodeTitle] = useState<string>(props.title || "");
  const [codeDescription, setCodeDescription] = useState<string>(
    props.description || ""
  );
  const [theme, setTheme] = useState<theme>({
    value: "cobalt",
    label: "Cobalt",
  });
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleThemeChange = (th) => {
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then((_) => setTheme(th));
    }
  };
  //set language
  const handleLanguageChange = (option) => {
    setLanguage(option);
    setCode(props.code ||starterCodeMap[option.value] || "// Write your code here");
  };
  

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("response data:", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      /*
      status id = 1 => in queue
      status id = 2 => processing
      */
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        //TO DO: HANDLE ALL STATUS IDS
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully");
        console.log("response data", response.data);
        return;
      }
    } catch (err) {
      console.log("check status error", err);
      setProcessing(false);
      showErrorToast("Something went wrong! Please try again later.");
    }
  };


  //set initial theme for the editor
  useEffect(() => {
    defineTheme("oceanic-next").then((_) => {
      setTheme({
        value: "oceanic-next",
        label: "Oceanic Next",
      });
    });
      // const socket = socketIOClient("localhost:3001");
      // socket.emit("join","abc");
  }, []);

  const onCodeChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      case "pairCode":{
        console.log(data);
        setCode(data);
        props.socketRef.emit("CODE_CHANGE",props.roomId,{
          data
        });
        break;
      }
      default: {
        console.warn("case not handled", action, data);
      }
    }
  };

  const handleSaveCode = async () => {
    const res = await fetch("/api/saveCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.user.email,
        code: code,
        title: codeTitle,
        description: codeDescription,
      }),
    });
    const ret = await res.json();
    console.log(ret);
    if (res.status === 201) {
      showSuccessToast("Code Saved!");
      setShowSaveCode(false);
    } else {
      showErrorToast("An error occured! Please try again later!");
    }
  };

  const handleUpdateCode = async () => {
    const res = await fetch("/api/updateCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        title: codeTitle,
        description: codeDescription,
        codeId: props.codeId,
      }),
    });
    const ret = await res.json();
    console.log(ret);
    if (res.status === 200) {
      showSuccessToast("Code Updated!");
      setShowSaveCode(false);
    } else {
      showErrorToast("An error occured! Please try again later!");
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
      />
      <div className="flex flex-row w-full justify-between md:justify-start">
        <div className="md:px-4 py-2 px-2 w-5/12 md:w-auto">
          <LanguageDropdown onSelectChange={handleLanguageChange} />
        </div>
        <div className="md:px-4 py-2 px-2 w-5/12 md:w-auto">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-start px-4 mt-4">
        <div className="md:flex flex-col w-full md:w-8/12 md:h-full h-96 justify-start items-end">
          <CodeEditor
            onChange={onCodeChange}
            language={language.value}
            theme={theme.value}
            code={code}
            action={props.pairCode ? "pairCode":"code"}
          />
        </div>
        <div className="w-full md:w-4/12 p-4 ml-auto">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <div className="flex w-full justify-between">
              {status === "authenticated" && !props.codeId && (
                <button
                  className={`${
                    !code && "opacity-50"
                  } mt-4 font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0`}
                  onClick={() => setShowSaveCode(true)}
                  disabled={!code}
                >
                  Save code
                </button>
              )}
              {status === "authenticated" && props.codeId && (
                <button
                  className={`${
                    !code && "opacity-50"
                  } mt-4 font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0`}
                  onClick={() => setShowSaveCode(true)}
                  disabled={!code}
                >
                  Update code
                </button>
              )}
              <button
                onClick={handleCompile}
                disabled={!code}
                className={`mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0 
              ${!code && "opacity-50"}`}
              >
                {processing ? "Compiling..." : "Compile"}
              </button>
            </div>
          </div>
          <Modal isOpen={showSaveCode} onClose={() => setShowSaveCode(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save your code snippet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <p className="text-sm">Code Title</p>
                  <input
                    type="text"
                    value={codeTitle}
                    name="title"
                    onChange={(e) => setCodeTitle(e.target.value)}
                    className="w-full border-2 border-black border-solid rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] focus:outline-none p-3"
                    required
                  />
                  <p className="text-sm mt-4">Code Description</p>
                  <input
                    type="text"
                    value={codeDescription}
                    onChange={(e) => setCodeDescription(e.target.value)}
                    name="description"
                    className="w-full border-2 border-black border-solid rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] focus:outline-none p-3"
                    required
                  />
                  <p className="text-sm mt-4">Code</p>
                  <textarea
                    name="code"
                    value={code}
                    className="w-full border-2 border-black border-solid rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] focus:outline-none p-3 resize-none"
                    disabled
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <button
                  className="mr-4 font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                  onClick={() => setShowSaveCode(false)}
                >
                  Cancel
                </button>
                {props.update ? (
                  <button
                    onClick={handleUpdateCode}
                    className="font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={handleSaveCode}
                    className="font-black border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                  >
                    Save
                  </button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
          <OutputDetails outputDetails={outputDetails} />
          <div className="mb-20" />
        </div>
      </div>
    </>
  );
};
export default Landing;
