"""Add foreign keys to user model

Revision ID: 669a5d7ce1eb
Revises: 1146722919fd
Create Date: 2024-07-05 19:22:21.115492

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '669a5d7ce1eb'
down_revision: Union[str, None] = '1146722919fd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'user', 'rol', ['rolUsuario'], ['idRol'])
    op.create_foreign_key(None, 'user', 'genero', ['genero'], ['idGenero'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='foreignkey')
    # ### end Alembic commands ###
