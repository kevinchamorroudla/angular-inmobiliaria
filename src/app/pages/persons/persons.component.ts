import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Persons } from '../../models/Persons';

import { PersonsService } from '../../services/persons.service';
import { MessagesService } from '../../services/messages.service';

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  iconEdit = faEdit
  iconRemove = faTrash

  personas: Persons[]
  persona: Persons

  displayedColumns: string[] = ['nro', 'nombre', 'surname', 'email'];

  personaForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private personasService: PersonsService,
    private mensajeService: MessagesService) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  onClickSavePersona(): void {
    this.addPersona();
  }

  getPersonas(): void {
    this.personasService.getPersonas()
      .subscribe(personas => this.personas = personas);
  }

  addPersona(): void {
    if (this.personaForm.valid) {
      let newPerson = new Persons();
      newPerson.id = this.personaForm.get("id").value;
      newPerson.name = this.personaForm.get("name").value;
      newPerson.surname = this.personaForm.get("surname").value;
      newPerson.email = this.personaForm.get("email").value;
      if (newPerson.id == null) {
        this.personasService.addPersona(newPerson)
          .subscribe(persona => { this.persona = persona; this.getPersonas(); });
      } else {
        this.personasService.editPersona(newPerson.id, newPerson)
          .subscribe(persona => { this.persona = persona; this.getPersonas(); });
      }
      this.personaForm.reset();
    }

  }

  onEditPerson(personSave): void {
    this.personaForm.patchValue({
      id: personSave.id,
      name: personSave.name,
      surname: personSave.surname,
      email: personSave.email
    });
  }

  onRemovePerson(personSave): void {
    this.personasService.removePersona(personSave.id)
      .subscribe(persona => { this.persona = persona; this.getPersonas(); });
    this.personaForm.reset();
  }

}
