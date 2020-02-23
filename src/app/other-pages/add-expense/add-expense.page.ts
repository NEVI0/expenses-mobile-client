import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
})

export class AddExpensePage implements OnInit {

    public form: FormGroup;
    public total: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const date = {
            d: new Date().getDate(),
            m: new Date().getMonth(),
            y: new Date().getFullYear()
        }

        var d = null;
        var m = null;

        if (date.d >= 1 && date.d <= 9) d = "0" + date.d; else d = date.d;
        if (date.m >= 1 && date.m <= 9) m = "0" + (date.m + 1); else m = date.m;

        this.form = this.formBuilder.group({
            name: [ null, Validators.required ],
            value: [ null, Validators.required ],
            date: [ `${d}/${m}/${date.y}`, [
                Validators.required,
                Validators.pattern("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$")
            ] ],
            description: [ null, Validators.maxLength(200) ]
        });

        this.form.valueChanges.subscribe(form => {
            if (form.description !== null) this.total = form.description.length
        });
    }

    onSubmit() {}

    clearForm() {
        this.form.reset();
        this.total = 0;
    }

}
