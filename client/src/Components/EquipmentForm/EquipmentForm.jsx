const EquipmentForm = ({ onSave, disabled, equipments, onCancel }) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const entries = [...formData.entries()];
  
      const equipment = entries.reduce((acc, entry) => {
        const [k, v] = entry;
        acc[k] = v;
        return acc;
      }, {});
  
      return onSave(equipment);
    };
  
    return (
      <form className="EmployeeForm" onSubmit={onSubmit}>
        {equipments && (
          <input type="hidden" name="_id" defaultValue={equipments._id} />
        )}
  
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={equipments ? equipments.name : null}
            name="name"
            id="name"
          />
        </div>
  
        <div className="control">
          <label htmlFor="name">Type:</label>
          <input
            defaultValue={equipments ? equipments.type : null}
            name="type"
            id="name"
          />
        </div>
  
        <div className="control">
          <label htmlFor="name">Amount:</label>
          <input
            defaultValue={equipments ? equipments.amount : null}
            name="amount"
            id="name"
          />
        </div>
  
        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {equipments ? "Update Equipment" : "Create Equipment"}
          </button>
  
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  };
  
  export default EquipmentForm;
  