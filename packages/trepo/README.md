# Trepo


## trepo--form-control
This acts as a state machine for the form

#### States
|            state            | save | delete | yes | no  |    message    |
|:----------------------------|:----:|:------:|:---:|:---:|:-------------:|
| initial                     | V,D  | H,D    | H,D | H,D |               |
| new                         | V,E  | H,D    | H,D | H,D |               |
| creating                    | V,D  | H,D    | H,D | H,D | Creating...   |
| creating-error              | V,E  | H,D    | H,D | H,D | {error}       |
| extant                      | V,D  | V,E    | H,D | H,D |               |
| changed                     | V,E  | V,E    | H,D | H,D |               |
| saving                      | V,D  | V,D    | H,D | H,D | Saving...     |
| saving-error                | V,E  | V,E    | H,D | H,D | {error}       |
| changed-delete-confirmation | H,D  | H,D    | V,E | V,E | Are you sure? |
| changed-deleting            | V,D  | V,D    | H,D | H,D | Deleting...   |
| changed-deleting-error      | V,E  | V,E    | H,D | H,D | {error}       |
| extant-delete-confirmation  | H,D  | H,D    | V,E | V,E | Are you sure? |
| extant-deleting             | V,D  | V,D    | H,D | H,D | Deleting...   |
| extant-deleting-error       | V,D  | V,E    | H,D | H,D | {error}       |

- `V` - Visible
- `H` - Hidden
- `E` - Enabled
- `D` - Disabled

#### Events
- `create` - Fired on `new->creating` or `creating-error->creating`.
- `update` - Fired on `changed->saving`, `saving-error->saving`, `changed-deleting-error->saving` or `extant-deleting-error->saving`.
- `delete` - Fired on `changed-delete-confirmation->changed-deleting` or `extant-delete-confirmation->extant-deleting`.

### Transitions
- `loaded event` - `initial->new` OR `initial->extant`
- `changed event` - `extant->changed`, `extant-delete-confirmation->changed-delete-confirmation`, `extant-deleting-error->changed-deleting-error`
- `created event` - `creating->extant`
- `updated event` - `saving->extant`
- `deleted event` - `changed-deleting->new`, `extant-deleting->new`
- `errored event` - `creating->creating-error`, `saving->saving-error`, `changed-deleting->changed-deleting-error`, `extant-deleting->extant-deleting-error`
- `save clicked` - `new->creating`, `creating-error->creating`, `changed->saving`, `saving-error->saving`, `changed-deleting-error->saving`
- `delete clicked` - `extant->extant-delete-confirmation`, `changed->changed-delete-confirmation`, `saving-error->changed-delete-confirmation`, `changed-deleting-error->changed-delete-confirmation`, `extant-deleting-error->extant-delete-confirmation`
- `yes clicked` - `changed-delete-confirmation->changed-deleting`, `extant-delete-confirmation->extant-deleting`
- `no clicked` - `changed-delete-confirmation->changed`, `extant-delete-confirmation->extant`
