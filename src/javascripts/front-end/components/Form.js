import React from 'react'
import DatePicker from 'react-datepicker'
import { UnifiedPageHeader } from './Pages'

function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

function FieldLabel({name, required}){
  let title = ''
  for(let i = 0; i < name.length; i++){
    if(i === 0) title += name[i].toUpperCase()
    else if(name[i] === name[i].toUpperCase()) title += ' ' + name[i].toLowerCase()
    else if(name[i] === '_') title += ' '
    else title += name[i]
  }

  return (
    <label htmlFor={name} className="form-label col-sm-2 text-end">
      <strong>{title}<span className='text-danger'>{ required ? '*' : '' }</span></strong>
    </label>
  )
}

function TextField({name, value, required, handleChange, error, type}){
  if(type === undefined) type = name === "password" ? "password" : "text"
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <input className={`form-control ${error ? 'is-invalid' : ''}`} type={type} id={name} value={value} onChange={handleChange}/>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function TextareaField({name, value, required, handleChange, error, rows}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <textarea className={`form-control ${error ? 'is-invalid' : ''}`} id={name} value={value} rows={rows} onChange={handleChange}></textarea>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function CheckboxField({name, value, required, setFieldValue, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name}  required={required} />
      <div className="has-validation col-sm-9">
        <input className="form-check-input" id="done" name="done" type="checkbox" checked={value} onChange={v => { setFieldValue(name, v.target.checked)}}/>
      </div>
    </div>
  )
}

//TO FINISH
function SelectField({name, value, required, handleChange, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <select className={`form-control ${error ? 'is-invalid' : ''}`} d={name} value={value} onChange={handleChange}>
          <option value="">not selected</option>
          <option value="non-started">not-started</option>
          <option value="in-progress">in-progress</option>
          <option value="finished">finished</option>
          <option value="cancelled">cancelled</option>
        </select>
        <VHelp message={error}/>
      </div>
    </div>
  )
}

function DateField({name, value, required, setFieldValue, error}){
  return (
    <div className="mb-3 row">
      <FieldLabel name={name} required={required} />
      <div className="has-validation col-sm-9">
        <div className={error ? 'is-invalid' : ''}>
          <DatePicker className={`form-control ${error ? 'is-invalid' : ''}`} id={name} selected={value} onChange={date => setFieldValue(name, date)}/>
        </div>        
        <VHelp message={error}/>
      </div>
    </div>
  )
}

export default function Form({title, nav, yup, formik, onCancel, textareas}) {
  let fields = []
  let count = 0
  for (const [name, schema] of Object.entries(yup.fields)) {
    let value = formik.values[name]
    let error = formik.errors[name]
    
    switch(schema.type){
      case "number":
        fields.push(<TextField key={count} 
                               name={name} type="number" 
                               required={schema.exclusiveTests?.required} 
                               value={value} 
                               error={error} 
                               handleChange={formik.handleChange}/>)
        break;
      case "date":
        fields.push(<DateField key={count} 
                               name={name}
                               required={schema.exclusiveTests?.required}
                               value={value} 
                               error={error} 
                               setFieldValue={formik.setFieldValue}/>)
        break;
        case "boolean":
          fields.push(<CheckboxField key={count} 
                                     name={name} 
                                     value={value} 
                                     required={schema.exclusiveTests?.required}
                                     error={error} 
                                     setFieldValue={formik.setFieldValue}/>)
          break;
      default:
        if(textareas && textareas[name]){
          fields.push(<TextareaField key={count} 
            name={name} 
            value={value} 
            required={schema.exclusiveTests?.required}
            error={error} 
            rows={textareas[name]}
            handleChange={formik.handleChange}/>)
        } else {
          fields.push(<TextField key={count} 
                                name={name} 
                                value={value} 
                                required={schema.exclusiveTests?.required}
                                error={error} 
                                handleChange={formik.handleChange}/>)
        }
    }

    count++
  }

  return (
    <div className="mx-5">
      <UnifiedPageHeader title={title} start_sz={6} end_sz={6} extra={nav} />
      <form onSubmit={formik.handleSubmit}>
        {/* <h1 className="pb-4 mb-4 border-bottom col-sm-9 offset-sm-2">{title}</h1> */}
        { fields }

        <div className="mb-3 row">
          <div className="col-sm-9 offset-sm-2">
            <button type="submit" className="btn btn-primary me-2">Submit</button>
            { onCancel && <button type="button" className="btn btn-danger me-2" onClick={onCancel}>Cancel</button> }
          </div>
        </div>
      </form >
    </div>
  )
}
