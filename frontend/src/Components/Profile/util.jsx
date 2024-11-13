import { DeleteIcon, Edit, Loader2, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

function createEditables(isEditing, name, ref, className = "") {
  if (isEditing) {
    return (
      <Input
        className={`${className} focus-visible:ring-0`}
        defaultValue={name}
        ref={ref}
      />
    );
  } else {
    return <div className={className}>{name}</div>;
  }
}

function createEditButtons(isEditing, setIsEditing, updateProfile, isLoading) {
  if (isEditing) {
    return (
      <>
        <Button
          className="text-sm font-medium"
          onClick={() => updateProfile()}
          variant="ghost"
        >
          {isLoading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
        </Button>
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {" "}
          <DeleteIcon size={13} />
        </Button>
      </>
    );
  } else {
    return (
      <Button
        className="text-sm font-medium"
        onClick={() => setIsEditing(!isEditing)}
        variant="ghost"
      >
        <Edit size={14} />
      </Button>
    );
  }
}

export { createEditables, createEditButtons };
