import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";

export const Accordions = ({
  categorySetter,
  categoryKeys,
  typeSetter,
  typeKeys,
  payTypeKeys,
  payTypeSetter,
  categories,
  types,
  payTypes,
}) => {
  const onCategoryChange = (e, cat) => {
    e
      ? categorySetter((prev) => [...prev, cat])
      : categorySetter((prev) => prev.filter((category) => category !== cat));
  };
  const onTypeChange = (e, type) => {
    e
      ? typeSetter((prev) => [...prev, type])
      : typeSetter((prev) => prev.filter((prevType) => prevType !== type));
  };
  const onPayTypeChange = (e, payType) => {
    e
      ? payTypeSetter((prev) => [...prev, payType])
      : payTypeSetter((prev) =>
          prev.filter((prevType) => prevType !== payType)
        );
  };
  return (
    <div className="lg:w-[28%] w-[100%] mt-5 text-left ">
      <Accordion type="multiple">
        <AccordionItem
          value="listing-category"
          className="mb-1 border rounded-xl"
        >
          <AccordionTrigger className="text-base lg:text-xl font-semibold text-left p-5">
            Listing Categories
          </AccordionTrigger>
          <AccordionContent className="pl-5">
            {categories &&
              categories.map((cat) => (
                <div className="flex items-center mb-4 gap-2" key={cat}>
                  <Checkbox
                    id={cat}
                    onCheckedChange={(e) => onCategoryChange(e, cat)}
                    checked={categoryKeys.includes(cat)}
                  />
                  <label
                    htmlFor={cat}
                    className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cat}
                  </label>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="listing-type" className="mb-1 border rounded-xl">
          <AccordionTrigger className="text-base lg:text-xl font-semibold text-left p-5">
            Listing Type
          </AccordionTrigger>
          <AccordionContent className="pl-5">
            {types &&
              types.map((type) => (
                <div className="flex items-center mb-4 gap-2" key={type}>
                  <Checkbox
                    id={type}
                    checked={typeKeys.includes(type)}
                    onCheckedChange={(e) => onTypeChange(e, type)}
                  />
                  <label
                    htmlFor={type}
                    className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pay-type" className="border rounded-xl">
          <AccordionTrigger className="text-base lg:text-xl font-semibold text-left p-5">
            Pay Type
          </AccordionTrigger>
          <AccordionContent className="pl-5">
            {payTypes &&
              payTypes.map((payType) => (
                <div key={payType}>
                  <div className="flex items-center mb-4 gap-2">
                    <Checkbox
                      id={payType}
                      checked={payTypeKeys.includes(payType)}
                      onCheckedChange={(e) => onPayTypeChange(e, payType)}
                    />
                    <label
                      htmlFor={payType}
                      className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {payType}
                    </label>
                  </div>
                  <div>
                    {(payType === "Equity" || payType === "Stipend") && (
                      <Slider
                        max={100}
                        min={0}
                        step={1}
                        value={[20, 40]}
                        minStepsBetweenThumbs={10}
                        formatLabel={(value) => `${value}`}
                        className="mb-8"
                      />
                    )}
                  </div>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
