import React, { useEffect, useState } from "react";
import "beca-ui/dist/main.css";
import "./App.css";
import "./styles/global.css";
import "./styles/home.css";
import { iconSections, IconSectionProps } from "./mock/icons";
import IconPreview from "./components/common/IconPreview";
import { Input, Switch } from "beca-ui";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [iconSectionsData, setIconSectionsData] =
    useState<IconSectionProps[]>(iconSections);
  const [variant, setVariant] = useState<"outlined" | "bold">("outlined");

  useEffect(() => {
    const iconSectionsTmp: IconSectionProps[] = [];
    iconSections.forEach((iconSection) => {
      const iconSectionTmp = { ...iconSection };
      const iconsTmp = iconSection.icons.filter((icon) => {
        const q = searchText.toLowerCase();
        return (
          (icon.outlinedName?.toLowerCase().includes(q) ||
            icon.boldName?.toLowerCase().includes(q)) ??
          false
        );
      });
      if (iconsTmp.length > 0) {
        iconSectionTmp.icons = iconsTmp;
        iconSectionsTmp.push(iconSectionTmp);
      }
    });
    setIconSectionsData(iconSectionsTmp);
  }, [searchText]);

  return (
    <div className="main-container">
      <div className="main-header">
        <h2 className="main-title">Becawork Icons</h2>
        <Switch
          checked={variant === "bold"}
          onChange={(checked) => setVariant(checked ? "bold" : "outlined")}
          checkedChildren="Bold"
          unCheckedChildren="Outlined"
        />
      </div>
      <div className="search-input-wrap">
        <Input
          variant="filled"
          placeholder="Search..."
          onChange={(ele) => setSearchText(ele.target.value)}
        />
      </div>
      <div className="icon-section">
        {iconSectionsData.map((iconSection, index) => (
          <div key={index}>
            <h3>{iconSection.title}</h3>
            <div className="icons-wrap">
              {iconSection.icons.map((icon) => (
                <IconPreview
                  key={icon.outlinedName}
                  outlinedName={icon.outlinedName}
                  boldName={icon.boldName}
                  icon={icon.outlinedIcon}
                  boldIcon={icon.boldIcon}
                  variant={variant}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
