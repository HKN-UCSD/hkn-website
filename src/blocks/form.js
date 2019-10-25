import React from "react"
import { Button } from "../components/style"
import styled, { css } from "styled-components"
import { mix } from "polished"
import slugify from "react-slugify"

export function Form({ form }) {
  return (
    <StyledForm
      name="contact"
      action="https://formspree.io/{form.recipient}"
      method="POST"
    >
      {form.fields.map(field => {
        if (field.inputType === "textarea") {
          return (
            <FormField wide>
              <label for={slugify(field.label)}>{field.label}</label>
              <textarea
                cols="40"
                rows="5"
                name={slugify(field.label)}
                id={slugify(field.label)}
              ></textarea>
            </FormField>
          )
        } else {
          return (
            <FormField>
              <label for={slugify(field.label)}>{field.label}</label>
              <input
                id={slugify(field.label)}
                name={slugify(field.label)}
                type={field.inputType}
                autocorrect="off"
                autocomplete={field.autocomplete | ``}
              />
            </FormField>
          )
        }
      })}
      <FormField wide>
        <Button primary type="submit" value="Submit">
          Submit
        </Button>
      </FormField>
    </StyledForm>
  )
}

const base = {
  name: "customInput",
  key: "label",
  component: "group",
  fields: [
    { name: "label", label: "Label", component: "text" },
    { name: "inputType", label: "Input Type", component: "text" },
    { name: "autocomplete", label: "Autocomplete", component: "text" },
  ],
}

export const customInputBlock = {
  label: "Custom Input",
  ...base,
}

export const nameInputBlock = {
  label: "Name Input",
  defaultItem: {
    label: "Name",
    inputType: "text",
    autocomplete: "name",
  },
  ...base,
}

export const formBlock = {
  label: "Form",
  key: "name",
  name: "form",
  component: "group",
  defaultItem: {
    _template: "formBlock",
    name: "Form",
    recipient: "email",
    fields: [],
  },
  fields: [
    { name: "name", label: "Name", component: "text" },
    {
      name: "recipient",
      label: "Recipient",
      component: "text",
    },
    {
      label: "Fields",
      name: "fields",
      component: "blocks",
      templates: {
        customInputBlock,
        nameInputBlock,
      },
    },
  ],
}

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 1.5rem;
  justify-items: stretch;

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const FormField = styled.div`
  input,
  textarea {
    position: relative;
    line-height: 2.25rem;
    font-size: 1rem;
    padding: 0 0.625rem;
    border-radius: ${props => props.theme.radius.small};
    border: none;
    width: 100%;
    transition: box-shadow 150ms ${props => props.theme.easing};
    color: ${props => props.theme.color.foreground};
    background-color: ${props =>
      mix(0.95, props.theme.color.background, props.theme.color.foreground)};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${props => props.theme.color.secondary};
    }
  }

  textarea {
    line-height: 1.5;
    padding: 0.5rem 0.625rem;
    resize: vertical;
  }

  label {
    display: block;
    margin-bottom: 0.25rem;
  }

  ${p =>
    p.wide &&
    css`
      @media (min-width: ${props => props.theme.breakpoints.medium}) {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `};
`